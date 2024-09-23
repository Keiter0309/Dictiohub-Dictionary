import React, { useState } from 'react';
import SearchResultForm from '../../components/SearchResultForm/SearchResultForm';
import Swal from 'sweetalert2';
import { Spin } from 'antd';
import { SearchResultFormProps } from '../../types/Dashboard/SearchResultFormProps';

const SearchResult: React.FC = () => {
    // Save favorite words
    const [favorites, setFavorites] = useState<string[]>([]);

    const handleFavorite = (word: string) => {
        if (favorites.includes(word)) {
            setFavorites(favorites.filter((fav) => fav !== word));
            showSwal('Removed from favorites', 'success');
        } else {
            setFavorites([...favorites, word]);
            showSwal('Added to favorites', 'success');
        }
    };

    const showSwal = (message: string, icon: 'success' | 'error') => {
        Swal.fire({
            toast: true,
            text: message,
            icon: icon,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
    };

    
}

export default SearchResult;