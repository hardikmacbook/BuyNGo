import React from "react";
import Heading from "../../SectionHeadings/Heading";

const Brand = () => {
  const brands = [
    // Tech Companies
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Samsung",
      logo: "https://www.pngall.com/wp-content/uploads/13/Samsung-Logo-PNG-HD-Image.png",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Dell",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    },
    {
      name: "HP",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
    },
    {
      name: "Sony",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
    },
    {
      name: "LG",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg",
    },
    {
      name: "Lenovo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
    },

    // Fashion & Luxury
    {
      name: "Gucci",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Gucci_Logo.svg",
    },
    {
      name: "Louis Vuitton",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg",
    },
    {
      name: "Prada",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Prada_Logo.svg",
    },
    {
      name: "Chanel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Chanel_logo_interlocking_cs.svg",
    },
    {
      name: "Versace",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Versace_Logo.svg",
    },
    {
      name: "Burberry",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/49/Burberry_logo.svg",
    },
    {
      name: "Armani",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Giorgio_Armani_Logo.svg",
    },

    // Retail Fashion
    {
      name: "Zara",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
    },
    {
      name: "H&M",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
    },
    {
      name: "Uniqlo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/UNIQLO_logo.svg",
    },
    {
      name: "Gap",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Gap_logo.svg",
    },
    {
      name: "Levi's",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/Levi%27s_logo.svg",
    },

    // Sports & Lifestyle
    {
      name: "Nike",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Adidas",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    },
    {
      name: "Puma",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/43/Puma_Logo.svg",
    },
    {
      name: "Under Armour",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Under_armour_logo.svg",
    },
    {
      name: "Reebok",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Reebok_logo.svg",
    },

    // Watches & Jewelry
    {
      name: "Rolex",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Rolex_logo.svg",
    },
    {
      name: "Omega",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Omega_Logo.svg",
    },
    {
      name: "Cartier",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Cartier_logo.svg",
    },

    // Beauty & Cosmetics
    {
      name: "L'Oréal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/L%27Or%C3%A9al_logo.svg",
    },
    {
      name: "MAC",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/76/MAC_Cosmetics_logo.svg",
    },
  ];

  return (
    <>
      <style>{`
                .brand-marquee-inner {
                    animation: brandMarqueeScroll 80s linear infinite;
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
                    flex-shrink: 0;
                }

                .brand-logo-container {
                    width: 140px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12px;
                }

                .brand-logo-img {
                    max-width: 100%;
                    max-height: 100%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    filter: grayscale(100%) brightness(0.8);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .brand-logo-wrapper:hover .brand-logo-img {
                    filter: grayscale(0%) brightness(1);
                    transform: scale(1.1);
                }

                .brand-logo-fallback {
                    width: 140px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-align: center;
                    padding: 12px;
                }
            `}</style>

      <div className="py-16 md:py-24 w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
                Premium Partners
              </span>
            </div>
            <Heading
              heading="Trusted by Leading Global Brands"
              desc="We collaborate with top companies worldwide to bring you the best products."
            />
          </div>

          {/* Logo Marquee */}
          <div className="overflow-hidden w-full relative select-none rounded-2xl py-8">
            {/* Left Gradient Fade */}
            <div className="absolute left-0 top-0 h-full w-32 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />

            {/* Marquee Container */}
            <div
              className="brand-marquee-inner flex will-change-transform"
              style={{ width: "max-content" }}
            >
              {/* Double the brands for seamless loop */}
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={`${brand.name}-${index}`}
                  className="brand-logo-wrapper mx-8 md:mx-12"
                >
                  <div className="brand-logo-container">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="brand-logo-img"
                      draggable={false}
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to secondary URL
                        if (!e.target.dataset.fallbackAttempted) {
                          e.target.dataset.fallbackAttempted = "true";
                          e.target.src = brand.fallback;
                        } else {
                          // Final fallback to text
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                                                        <div class="brand-logo-fallback">
                                                            ${brand.name}
                                                        </div>
                                                    `;
                        }
                      }}
                    />
                  </div>
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
                50+
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                Global Brands
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                20+
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                Happy Customers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                84.9%
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                Satisfaction Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black bg-clip-text mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brand;
