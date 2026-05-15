import { useEffect, useRef } from 'react';

const Location = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const scriptId = 'daum-map-loader';
    let script = document.getElementById(scriptId);

    const renderMap = () => {
      if (window.daum?.roughmap && mapRef.current) {
        mapRef.current.innerHTML = '';
        new window.daum.roughmap.Lander({
          timestamp: '1776523528589',
          key: 'mbk743dpep3',
          mapWidth: '100%',
          mapHeight: '240',
        }).render();
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';
      script.charset = 'UTF-8';
      script.onload = renderMap;
      document.head.appendChild(script);
    } else {
      renderMap();
    }
  }, []);

  return (
    <div className="page">
      <div className="page-body">
        <div className="map-wrap">
          <div
            id="daumRoughmapContainer1776523528589"
            ref={mapRef}
            className="root_daum_roughmap root_daum_roughmap_landing"
            style={{ width: '100%' }}
          />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div className="location-info-row">
            <span className="location-icon"><i className="fas fa-map-marker-alt" /></span>
            <span>
              <div className="location-text-label">주소</div>
              <div className="location-text-val">경기 부천시 원미구 장말로187번길 30</div>
            </span>
          </div>
          <div className="location-divider" />
          <div className="location-info-row">
            <span className="location-icon"><i className="fas fa-phone" /></span>
            <span>
              <div className="location-text-label">연락처</div>
              <a href="tel:032-651-1691" className="location-text-val" style={{ textDecoration: 'none', color: 'inherit' }}>
                032-651-1691
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
