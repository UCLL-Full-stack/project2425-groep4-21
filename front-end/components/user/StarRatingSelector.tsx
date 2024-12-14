
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type Props = {
    minRating: number;
    setMinRating: (rating: number) => void;
};

const StarRatingSelector: React.FC<Props> = ({ minRating, setMinRating }) => {
    const [hoverRating, setHoverRating] = useState<number>(0);

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors duration-200 ${
                        (hoverRating || minRating) >= star ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setMinRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            setMinRating(star);
                        }
                    }}
                />
            ))}
        </div>
    );
};

export default StarRatingSelector;
