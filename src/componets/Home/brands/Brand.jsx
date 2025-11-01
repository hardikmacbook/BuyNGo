import React from 'react'
import Heading from '../../SectionHeadings/Heading';

const Brand = () => {
    const companyLogos = [
        "samsung", "oneplus", "apple", "dell", "lg",
        "levis", "louis-vuitton", "zara", "hm", "rolex",
        "nike", "adidas", "gucci", "prada", "chanel"
    ];

    return (
        <>
            <style>{`
                .brand-marquee-inner {
                    animation: brandMarqueeScroll 60s linear infinite;
                }

                @keyframes brandMarqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .brand-logo-wrapper {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .brand-logo-img {
                    width: 120px;
                    height: 60px;
                    object-fit: contain;
                }
            `}</style>

            <div className="py-16 md:py-24 w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                                Premium Partners
                            </span>
                        </div>
                        {/* Header */}
                                    <div className="text-center mb-16">
                                        <Heading 
                                            heading="Trusted by Leading Global Brands"
                                            desc="We collaborate with top companies worldwide to bring you the best products."
                                        />   
                                    </div>
                    </div>

                    <div className="overflow-hidden w-full relative select-none shine-effect rounded-2xl py-8">
                        {/* Left Gradient Fade */}
                        <div className="absolute left-0 top-0 h-full w-32 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
                        
                        {/* Marquee Container */}
                        <div className="brand-marquee-inner flex will-change-transform" style={{ width: 'max-content' }}>
                            {/* Quadruple logos for seamless continuous loop */}
                            {[...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos].map((company, index) => (
                                <div 
                                    key={index} 
                                    className="brand-logo-wrapper flex items-center justify-center mx-8 md:mx-12 flex-shrink-0"
                                >
                                    <img 
                                        src={`https://logo.clearbit.com/${
                                            company === 'apple' ? 'apple.com' : 
                                            company === 'samsung' ? 'samsung.com' : 
                                            company === 'oneplus' ? 'oneplus.com' :
                                            company === 'dell' ? 'dell.com' :
                                            company === 'lg' ? 'lg.com' :
                                            company === 'levis' ? 'levi.com' :
                                            company === 'louis-vuitton' ? 'louisvuitton.com' :
                                            company === 'zara' ? 'zara.com' :
                                            company === 'hm' ? 'hm.com' :
                                            company === 'rolex' ? 'rolex.com' :
                                            company === 'nike' ? 'nike.com' :
                                            company === 'adidas' ? 'adidas.com' :
                                            company === 'gucci' ? 'gucci.com' :
                                            company === 'prada' ? 'prada.com' :
                                            'chanel.com'
                                        }`}
                                        alt={company}
                                        className="brand-logo-img filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                                        draggable={false}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `
                                                <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text" style="width: 120px; height: 60px; display: flex; align-items: center; justify-content: center;">
                                                    ${company.toUpperCase().replace('-', ' ')}
                                                </span>
                                            `;
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right Gradient Fade */}
                        <div className="absolute right-0 top-0 h-full w-32 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                                500+
                            </div>
                            <div className="text-gray-600 text-sm md:text-base">Global Brands</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                                50K+
                            </div>
                            <div className="text-gray-600 text-sm md:text-base">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                                99.9%
                            </div>
                            <div className="text-gray-600 text-sm md:text-base">Satisfaction Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                                24/7
                            </div>
                            <div className="text-gray-600 text-sm md:text-base">Support Available</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Brand
