import Icon from '../Icon';

const Header = () => {
    return (
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center">
              <Icon name="email" size="xl" style={{ margin: "0 16px"}} />
              <div>
                <h1 className="text-2xl font-semibold">
                  Email Classifier
                </h1>
                <p style={{ marginBottom: '12px' }}>Classifique e gere respostas automaticamente</p>  
              </div>
            </div>
          </div>
          <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg">
            Histórico
          </button>
        </div>
    );
};

export default Header;