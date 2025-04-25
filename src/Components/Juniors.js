import React from 'react';
import './Juniors.css';

import touchImage    from '../Images/Junior Touch 2025.jpeg';
import junioriImage  from '../Images/Juniors 1.png';
import playLeft      from '../Images/Juniors 3.png';
import playRight     from '../Images/Juniors 2.png';

const Juniors = () => (
  <section id="juniors-section" className="juniors-section">
    <div className="content-container">
      <h1 className="section-title">JUNIORS</h1>
    </div>

    {/* ─── Top two flyers ───────────────────────────── */}
    <div className="two-up-row top-images-wrapper">
      <picture>
        <source
          srcSet={touchImage.replace('.jpeg', '.webp')}
          type="image/webp"
        />
        <img
          src={touchImage}
          alt="Junior Touch 2025"
          className="responsive-img"
        />
      </picture>
      <picture>
        <source
          srcSet={junioriImage.replace('.png', '.webp')}
          type="image/webp"
        />
        <img
          src={junioriImage}
          alt="Juniori Rugby Flyer"
          className="responsive-img"
        />
      </picture>
    </div>

    {/* ─── Text block under the top flyers ──────────── */}
    <div className="text-block">
      <div className="content-container">
        <p>
          Juniorit treenaavat tiistaisin hamarin nurmella Klo 18.30-19.30<br/>
          Juniori rugbyä on jatkettu. Otamme avoimin käsin vastaan kaikki nuoret
          ja lajista kiinnostuneet mukaan. Tällä hetkellä seura kaavailee jo
          ensimmäisiä pelejä junioreille. Jos olet kiinnostunut, otathan yhteyttä
          suomeksi numeroon +358408326626 (Juniori koordinaattori/valmentaja) ja
          ruotsiksi +358401930772 (apuvalmentaja).<br/>
          JUNIORIT PELAAVAT MYÖS MATSEJA YMPÄRI VUODEN
        </p>
        <p className="juniors-english">
          Juniors train on Tuesdays at Kokon Grass Pitch from 18.30-19.30<br/>
          Junior rugby has been resumed. We welcome with open arms all youngsters
          and those interested in the sport. At the moment the club is already
          planning the first games for juniors. If you are interested, please
          contact us in Finnish at +358408326626 (Junior coordinator/coach) and
          in Swedish at +358401930772 (assistant coach).<br/>
          JUNIORS ALSO PLAY MATCHES ALL YEAR ROUND
        </p>
      </div>
    </div>

    {/* ─── Bottom two play-shots ────────────────────── */}
    <div className="two-up-row play-images-wrapper">
      <picture>
        <source
          srcSet={playLeft.replace('.png', '.webp')}
          type="image/webp"
        />
        <img
          src={playLeft}
          alt="Juniors training"
          className="responsive-img"
        />
      </picture>
      <picture>
        <source
          srcSet={playRight.replace('.png', '.webp')}
          type="image/webp"
        />
        <img
          src={playRight}
          alt="Juniors match"
          className="responsive-img"
        />
      </picture>
    </div>
  </section>
);

export default React.memo(Juniors);
