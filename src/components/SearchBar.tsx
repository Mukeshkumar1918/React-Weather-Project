import { useState, FormEvent, ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search Tamil Nadu districts or Indian states..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8 animate-fade-in">
      <div className="flex gap-2 p-2 rounded-2xl glass-effect shadow-elegant">
        <div className="flex-1 flex items-center gap-3 px-4 bg-background/50 rounded-xl">
          <Search className="text-muted-foreground" size={20} />
          <Input
            type="text"
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            aria-label="Search location"
          />
        </div>
        <Button 
          type="submit"
          disabled={!searchTerm.trim()}
          className="px-8 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          size="lg"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
