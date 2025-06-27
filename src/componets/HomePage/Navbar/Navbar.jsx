import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import Navlinks from './Navlinks';
import Cart from './Cart';
import Button from '../../Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Products', 'About', 'Contact'];

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          isScrolled
            ? 'backdrop-blur-xl bg-white/100 shadow-2xl shadow-cyan-500/40'
            : 'backdrop-blur-lg bg-white/50'
        }`}
        style={{
          width: window.innerWidth >= 640 ? '800px' : 'auto',
          maxWidth: window.innerWidth >= 640 ? 'none' : 'calc(100vw - 32px)',
          borderRadius: '24px',
          border: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.4)'
            : '1px solid rgba(6, 182, 212, 0.2)',
          boxShadow: isScrolled
            ? '0 30px 60px rgba(6, 182, 212, 0.3), 0 12px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            : '0 8px 32px rgba(6, 182, 212, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }}
      >
        <nav className={`px-6 sm:px-8 lg:px-10 py-2 transition-all duration-700`}>
          <div className="flex items-center justify-between">
            <Logo />

            <Navlinks />
            <div className="flex items-center space-x-4">
              <Cart />
              <Button label="Login" />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-white/50 hover:bg-white/70 transition-all duration-300 border border-white/40 backdrop-blur-md"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="space-y-2 py-4 px-2 border-t border-white/40">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="block px-4 py-3 text-base text-slate-700 hover:text-slate-900 hover:bg-white/40 rounded-lg transition-all duration-300 font-medium"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <div className="pt-30 px-20 max-w-[1200px] w-full mx-auto justify-center"> {/* 👈 Padding top added here */}
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam harum rem corrupti autem mollitia reiciendis, est quia numquam quo cum pariatur aut non consequatur. Dolores eum repellat voluptatum aliquam reprehenderit corrupti magnam, dignissimos optio porro corporis minima tempore quisquam deserunt ratione, libero debitis autem quia perferendis? Harum quidem placeat esse suscipit, assumenda velit soluta sapiente omnis animi aperiam magni tempore quod ut alias nostrum, ipsam, at minus dolore earum dolorem. At sint officiis excepturi quasi blanditiis esse perspiciatis modi, ad reiciendis corrupti quia. Explicabo laudantium inventore totam culpa earum vero ipsa delectus quos natus veritatis quia fuga, voluptas odit architecto ea tempore aspernatur quidem alias ut ipsum perferendis? Doloribus, a quibusdam. Impedit, vitae veniam temporibus est aspernatur nesciunt excepturi adipisci eius, nisi dolore numquam, quis sit delectus officiis incidunt debitis commodi harum error doloribus? Ex, officia omnis, iure mollitia soluta doloremque dolorem tempora praesentium beatae provident, porro facilis dolor quae accusamus. Alias ipsam reiciendis animi? Temporibus non itaque rerum autem quod illum commodi sed impedit libero vel dicta tempora consequatur ullam ex, voluptatem quas consequuntur necessitatibus laudantium? Perferendis odio repudiandae aliquid, ex error rem iste repellendus, explicabo necessitatibus autem sunt! Iure, porro! Consequuntur suscipit hic, exercitationem iure amet maiores, voluptates culpa voluptatem dolorum fugit ex accusantium sapiente eum soluta neque explicabo labore qui, odit corrupti minima tenetur magnam impedit! Minus esse labore, veniam officia libero ab dolorum incidunt iste rem itaque modi omnis sint magnam aperiam dolore officiis sapiente? Et veniam, reiciendis adipisci illo explicabo saepe, ex ipsam commodi, eius aperiam tempore laudantium fugit dolore. Dolorem rerum eius quibusdam repellendus magnam est quam fugiat blanditiis odit! Consequuntur asperiores non ab numquam tenetur dicta nisi ipsum veritatis quidem officiis voluptas quis, aliquam cum, labore repudiandae quia quam iure! Beatae a deserunt dolore quas hic quae velit quibusdam? Atque ut perferendis et, eos quae architecto reprehenderit libero impedit, iure dolorum provident hic repudiandae magni. Dicta voluptate illo perspiciatis nemo et, quo cumque, placeat doloremque, repudiandae adipisci earum culpa explicabo id neque consectetur reprehenderit rerum voluptas. Recusandae architecto voluptates qui. A porro aut quod sint nesciunt asperiores voluptatem labore earum sequi, adipisci et voluptatibus perspiciatis ab, dignissimos consequatur fugiat eius. Itaque illum reprehenderit non sit vero, qui ducimus corrupti blanditiis quod distinctio officiis voluptatibus velit vitae eius. Maxime, dolor a, esse exercitationem nisi perspiciatis eos nulla quo illum ipsam iste ut, possimus tempora id. Labore voluptate aliquam asperiores impedit beatae quis cupiditate officiis animi, rem atque neque iusto error magnam praesentium voluptatibus fugit architecto deleniti laudantium mollitia eaque quas ducimus. Molestias perspiciatis, omnis quia dolor itaque obcaecati eligendi, aliquam laborum facilis asperiores hic. Quas ex itaque eum aliquam, repellendus corporis impedit accusamus molestiae odio ratione repudiandae rem molestias tenetur, cum explicabo quia tempora error aspernatur nemo perferendis blanditiis! Iste fuga, dolores numquam animi itaque alias sunt et sequi neque. Iusto laudantium doloribus obcaecati rerum laboriosam! Non dolor enim magni asperiores suscipit? Id ut, nostrum velit doloribus excepturi corporis? Provident ea molestias beatae quia accusamus voluptas fugiat aliquid autem voluptatem rem? Pariatur soluta voluptatibus dignissimos labore excepturi modi qui nihil deserunt temporibus recusandae enim ipsam reprehenderit sed beatae, aliquid reiciendis perspiciatis minima fuga sit cum iure delectus tempore dolorum. Totam at aperiam sequi iste voluptatum, beatae saepe aut sed veritatis, vero pariatur cupiditate temporibus laudantium optio unde. Quibusdam tempore quia, nostrum magnam distinctio possimus, delectus rem dicta veritatis dolorum sequi voluptatum esse veniam. Ea a dolore sunt, aliquam itaque quos tenetur quo magni facere exercitationem corrupti rem nobis tempore vero reprehenderit repellendus ab aspernatur consequuntur! Odio, doloremque reprehenderit magnam cupiditate natus aperiam dignissimos culpa. Molestias numquam unde culpa? Hic rerum nulla eos dicta tenetur voluptates laborum, mollitia ab aperiam, incidunt assumenda expedita adipisci? Sit ducimus velit enim, dolorum quae consequatur labore mollitia repellendus accusantium aliquid cupiditate excepturi dolorem repudiandae saepe iure! Itaque non dolor animi, architecto blanditiis, veniam consequuntur voluptatibus qui quod in commodi ipsa impedit amet aut magnam necessitatibus voluptatum porro nisi, accusantium enim vel. Debitis cumque consectetur obcaecati hic tenetur fugiat impedit quaerat cupiditate! Vel ratione architecto optio quidem quasi repellat distinctio quo aliquam at ad sit, minus officiis libero maxime in doloribus soluta maiores assumenda necessitatibus enim ab nesciunt est error beatae. Dolor blanditiis itaque, animi qui cumque tempore dolorem quam a quod iusto. Iusto eos nemo, est laudantium molestias aperiam ab, harum alias doloribus adipisci architecto. Magni vitae illo nesciunt? Velit, molestiae reprehenderit neque ipsa totam quo temporibus inventore nihil ab id, minima, quibusdam beatae dolore sunt? Eius cumque, recusandae, ullam alias quasi commodi rerum quisquam ipsum, sed praesentium magni quas? Fuga, repellendus impedit. Ipsa doloribus perferendis aliquid corrupti repudiandae veniam similique, distinctio assumenda quidem nihil? Natus, sint nesciunt! Rem sapiente accusantium voluptatem nobis quas, molestiae optio officiis suscipit, dolores consectetur aperiam nihil aliquid, dolor iure. Numquam at eius, tempore fugiat velit, incidunt delectus sed obcaecati vel facilis error, amet consequatur? Voluptatem non blanditiis quod. Adipisci iusto sunt cupiditate voluptate. Porro cupiditate doloremque labore praesentium, aperiam atque! Dolorem quasi atque ad quas blanditiis error ipsa? Sint in eveniet incidunt laborum impedit fugit nam perferendis cumque reiciendis, aspernatur vitae sapiente? Iusto quae aspernatur pariatur a aperiam libero odio, placeat eligendi, ipsa ab, expedita modi totam voluptatum amet neque omnis culpa alias architecto iure magni. Omnis delectus libero facilis velit quisquam quod molestias odit natus asperiores est aperiam, doloremque similique magni debitis pariatur ipsam voluptas aspernatur fugiat, recusandae nostrum ratione cumque? Laboriosam ducimus nisi nulla, earum dicta voluptatum accusamus est officiis consequatur vero ex, illum, odit similique quis facilis soluta voluptates velit. Doloribus consectetur voluptatibus odit perspiciatis sed, nulla temporibus vero esse corporis corrupti placeat animi quae porro tempora accusamus tenetur voluptatem soluta repellat deserunt nihil. Dolores velit quas maiores repellat! Error veritatis itaque blanditiis quasi, pariatur est quisquam reprehenderit accusamus asperiores possimus repudiandae sunt ut, eligendi, corporis totam modi architecto. Ipsam molestiae quod exercitationem aperiam voluptatibus deserunt vero, perferendis eos corporis. Totam ipsa temporibus nulla tempore! Id repellendus iure consequatur fuga tempore libero eligendi numquam praesentium minus aliquam? Sunt voluptates distinctio voluptatum sit placeat nihil doloremque deleniti veniam! Nihil, est error!</p>
        {/* Add your page content he re */}
      </div>
    </>
  );
};

export default Navbar;
