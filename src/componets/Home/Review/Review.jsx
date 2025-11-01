import React from 'react';
import Heading from '../../SectionHeadings/Heading';

const CustomerReviews = () => {
    const cardsData = [
        {
            id: 1,
            name: 'Kamaliya Hardik',
            avatar: 'KH',
            date: '2 days ago',
            review: "Absolutely love this product! The quality exceeded my expectations and the customer service was exceptional. Will definitely be ordering again.",
            verified: true
        },
        {
            id: 2,
            name: 'Bhayani Krishna',
            avatar: 'BK',
            date: '1 week ago',
            review: "Fast shipping, great packaging, and the product works exactly as described. Very satisfied with my purchase.",
            verified: true
        },
        {
            id: 3,
            name: 'Rawal Sahilkumar',
            avatar: 'RS',
            date: '2 weeks ago',
            review: "Good quality product, though it took a bit longer to arrive than expected. Overall happy with the purchase.",
            verified: true
        },
        {
            id: 4,
            name: 'Rawal Kunal',
            avatar: 'RK',
            date: '3 weeks ago',
            review: "Outstanding quality and attention to detail. This company really cares about their customers and it shows in every aspect.",
            verified: true
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
            <div className="flex gap-2 mb-3">
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-semibold text-sm">
                        {card.avatar}
                    </span>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <p className="font-medium text-gray-900">{card.name}</p>
                        {card.verified && (
                            <svg className="mt-0.5" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="#2196F3" />
                            </svg>
                        )}
                    </div>
                    <span className="text-xs text-slate-500">{card.date}</span>
                </div>
            </div>
            <p className="text-sm py-4 text-gray-800">
                "{card.review}"
            </p>
        </div>
    );

    return (
        <section className="py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
                <Heading 
                    heading="What Our Customers Are Saying"
                    desc="Real reviews from happy shoppers. See why people love our products!"
                />   
            </div>

            {/* Marquee Section */}
            <div className="relative">
                <style>{`
                    @keyframes reviewMarqueeScroll {
                        0% { transform: translateX(0%); }
                        100% { transform: translateX(-50%); }
                    }

                    .review-marquee-inner {
                        animation: reviewMarqueeScroll 20s linear infinite;
                    }

                    .review-marquee-reverse {
                        animation-direction: reverse;
                    }
                `}</style>

                {/* First Row - Normal Direction */}
                <div className="marquee-row w-full overflow-hidden relative mb-8">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    <div className="review-marquee-inner flex transform-gpu py-5" style={{ width: 'max-content' }}>
                        {[...cardsData, ...cardsData, ...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={`normal-${index}`} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>

                {/* Second Row - Reverse Direction */}
                <div className="marquee-row w-full overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                    <div className="review-marquee-inner review-marquee-reverse flex transform-gpu py-5" style={{ width: 'max-content' }}>
                        {[...cardsData, ...cardsData, ...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={`reverse-${index}`} card={card} />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
