import { useStore } from '../data/StoreContext';

const icons = ['fas fa-sun', 'fas fa-child', 'fas fa-moon', 'fas fa-star', 'fas fa-pray'];

const ServiceInfo = () => {
  const { store } = useStore();
  const services = store.services ?? [];

  return (
    <div className="page">
      <div className="page-body">
        <div className="service-list">
          {services.map((s, i) => (
            <div key={s.id} className="service-row">
              <span className="service-icon"><i className={icons[i % icons.length]} /></span>
              <span className="service-info">
                <span className="service-name">{s.name}</span>
                <span className="service-place">
                  <i className="fas fa-map-marker-alt" style={{ fontSize: '0.7rem', marginRight: '3px' }} />
                  {s.place}
                </span>
              </span>
              <span className="service-time">{s.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
