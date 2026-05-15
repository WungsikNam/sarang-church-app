import { useStore } from '../data/StoreContext';

const iconList = ['fas fa-users', 'fas fa-praying-hands', 'fas fa-child', 'fas fa-cross', 'fas fa-dove'];

const Congregation = () => {
  const { store } = useStore();
  const list = store.congregation ?? [];

  return (
    <div className="page">
      <div className="page-body">
        {list.length === 0 ? (
          <div className="cong-empty">
            <i className="fas fa-users" />
            등록된 신도회가 없습니다.
          </div>
        ) : (
          <div className="cong-list">
            {list.map((item, i) => (
              <div key={item.id} className="cong-card">
                <span className="cong-avatar"><i className={iconList[i % iconList.length]} /></span>
                <span className="cong-body">
                  <span className="cong-name">{item.name}</span>
                  {item.leader && (
                    <span className="cong-leader">
                      <i className="fas fa-user" style={{ fontSize: '0.65rem', marginRight: '3px' }} />
                      {item.leader}
                    </span>
                  )}
                  {item.description && <span className="cong-desc">{item.description}</span>}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Congregation;
