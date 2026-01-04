import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './components/SearchForm';
import PropertyCard from './components/PropertyCard';
import PropertyDetails from './components/PropertyDetails';

// Sample property for testing
const sampleProperty = {
  title: "My House",
  location: "Colombo",
  price: 2500000,
  type: "House",
  bedrooms: 3,
  description: "Nice house",
  picture: "house1.jpeg",
  images: ["house1.jpeg"],
  floorplan: "floorplan1.jpg",
 
};


describe('tests for React app', () => {

  // Check if the SearchForm updates inputs and resets correctly
  test('SearchForm updates inputs and resets', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);

    // Change the type dropdown
    const typeSelect = screen.getByRole('combobox');
    fireEvent.change(typeSelect, { target: { value: 'house' } });
    expect(typeSelect.value).toBe('house');

    // Change the number inputs (min and max price)
    const numberInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(numberInputs[0], { target: { value: '1000' } });
    fireEvent.change(numberInputs[1], { target: { value: '5000' } });
    expect(numberInputs[0].value).toBe('1000');
    expect(numberInputs[1].value).toBe('5000');

    // Click the Search button and make sure the callback is called
    const searchBtn = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchBtn);
    expect(onSearch).toHaveBeenCalled();

    // Click the Reset button and check if inputs go back to default
    const resetBtn = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetBtn);
    expect(typeSelect.value).toBe('any');
    expect(numberInputs[0].value).toBe('');
    expect(numberInputs[1].value).toBe('');
  });

  // Make sure SearchForm calls onSearch with correct input values
  test('SearchForm calls onSearch with correct values', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'house' } });
    const numberInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(numberInputs[0], { target: { value: '1000' } });
    fireEvent.change(numberInputs[1], { target: { value: '5000' } });

    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    expect(onSearch).toHaveBeenCalledWith({
      type: 'house',
      minPrice: '1000',
      maxPrice: '5000',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: ''
    });
  });

  // Check if PropertyCard renders the property information
  test('PropertyCard renders with correct info', () => {
    const onAddToFavorites = jest.fn();

    render(<PropertyCard property={sampleProperty} onAddToFavorites={onAddToFavorites} />);

    // Check main elements exist
    expect(screen.getByText(/Colombo/i)).toBeInTheDocument();
    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms:/i)).toBeInTheDocument();
    expect(screen.getByText(/Description:/i)).toBeInTheDocument();

    // Test clicking the favorite button triggers callback
    fireEvent.click(screen.getByText(/Add To Favorites/i));
    expect(onAddToFavorites).toHaveBeenCalledWith(sampleProperty);
  });

  
  // Check if Add To Favorites button works
  test('PropertyCard Add To Favorites button works', () => {
    const property = { location: 'Colombo', price: 1000, type: 'House', bedrooms: 2, description: '', picture: '' };
    const onAddToFavorites = jest.fn();

    render(<PropertyCard property={property} onAddToFavorites={onAddToFavorites} />);
    const button = screen.getByRole('button', { name: /Add To Favorites/i });

    fireEvent.click(button);
    expect(onAddToFavorites).toHaveBeenCalledWith(property);
  });

  // Check that PropertyDetails shows the description tab by default
  test('PropertyDetails shows description by default', () => {
    const property = {
      location: 'Colombo',
      price: 5000000,
      description: 'Nice property',
      added: { day: 1, month: 1, year: 2026 },
      images: [],
      floorplan: '',
      mapLink: ''
    };
    render(<PropertyDetails property={property} onBack={() => {}} />);
    expect(screen.getByText(/Nice property/i)).toBeInTheDocument();
  });

  // Check if switching tabs in PropertyDetails works
  test('PropertyDetails tab switching works', () => {
    const property = {
      location: 'Colombo',
      price: 5000000,
      description: 'Nice property',
      added: { day: 1, month: 1, year: 2026 },
      images: [],
      floorplan: 'floorplan1.jpeg',
      mapLink: ''
    };
    render(<PropertyDetails property={property} onBack={() => {}} />);

    // Switch to Floor Plan tab
    fireEvent.click(screen.getByText(/Floor Plan/i));
    expect(screen.getByAltText(/floorplan/i)).toBeInTheDocument();

    // Switch back to Description tab
    fireEvent.click(screen.getByText(/Description/i));
    expect(screen.getByText(/Nice property/i)).toBeInTheDocument();
  });

});
