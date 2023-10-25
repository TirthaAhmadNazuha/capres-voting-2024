import { StateComponent, fullyPrepared, usingState } from 'amber';
import '../styles/index.sass';
import { capres, deleteVoter, findCapresId, getCountVoters, postVoter } from './datas';
import { nanoid } from 'nanoid';

const App = class extends StateComponent {
  constructor() {
    super();
    this.state = {
      capressSelectedId: ''
    };
    this.defaultStateBtn = {
      className: 'w-full p-2 bg-indigo-800 font-medium text-white rounded-full mt-auto transition duration-300',
      text: 'Vote'
    };
    this.selectedStateBtn = {
      className: 'w-full p-2 text-indigo-800 font-medium bg-indigo-200 rounded-full mt-auto transition duration-300',
      text: 'Voted'
    };
    this.GetOrCreateUserId();
    this.selectedCapresId = null;
  }

  GetOrCreateUserId() {
    const savedOnLocal = window.localStorage.getItem('voterId');
    if (savedOnLocal == null) {
      this.voterId = `voter-${nanoid()}`;
      window.localStorage.setItem('voterId', this.voterId);
    } else if (savedOnLocal?.length == 27 && savedOnLocal?.startsWith('voter-')) {
      this.voterId = savedOnLocal;
    } else {
      this.voterId = `voter-${nanoid()}`;
      window.localStorage.setItem('voterId', this.voterId);
    }
  }

  Header() {
    return (
      <header className="fixed top-0 left-0 right-0">
        <div className="bg-indigo-900 p-2 font-semibold flex italic justify-center text-white">#Capres<span className="text-red-500">2024</span></div>
        <nav className="bg-indigo-200 flex p-3 pt-4 justify-center">
          <h1 className="text-3xl font-medium"><span className="text-lg mr-1 text-indigo-800">Pre</span>Voting Capres 2024</h1>
        </nav>
      </header>
    );
  }

  Footer() {
    return (
      <footer className="bg-indigo-900 px-5 py-5 flex flex-wrap gap-5 justify-evenly">
        <div>
          <h4 className="font-semibold text-indigo-300">Created By</h4>
          <h2 className="text-2xl text-indigo-50" onClick={async () => {
            console.log(await (await fetch('.netlify/functions/test')).text());
          }}>Tirtha Ahmad Nazuha</h2>
        </div>
        <div>
          <h4 className="font-semibold text-indigo-300">Contact Me On</h4>
          <ul className="text-indigo-100">
            <li><a href="http://instagram.com/me.tirtha" target="_blank" rel="noopener noreferrer">@me.tirtha</a></li>
            <li>tirthaahmadnazuha.udah@gmail.com</li>
            <li>(+ 62) 857-7876-9535</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-indigo-300">One Of The Maker Projects</h4>
          <p className="text-indigo-100 w-80">
            This project is one of the projects made by Tirtha Ahmad Nazuha, a Full Stack JavaScript developer from Indonesia.
          </p>
        </div>
        <div className="w-full text-center my-3">
          <h5 className="text-sm font-medium text-indigo-500">Created with coffee</h5>
        </div>
      </footer>
    );
  }

  clearSelectBtns() {
    this.element.querySelectorAll('main article > button').forEach((btn) => {
      btn.className = this.defaultStateBtn.className;
      btn.textContent = this.defaultStateBtn.text;
    });
  }

  render() {
    return (
      <div className="app min-h-screen">
        <this.Header />
        <main>
          <div className="flex pt-40 px-4 bg-indigo-50 py-14 gap-6 justify-center items-stretch flex-wrap">
            {Object.keys(capres).map((no) => {
              /** @type {{nama: string, partai: string, image: string}} */
              const calo = capres[no];
              const btn = <button className={this.defaultStateBtn.className}>{this.defaultStateBtn.text}</button>;
              btn.capresId = no;
              btn.addEventListener('click', async () => {
                this.clearSelectBtns();
                btn.className = this.selectedStateBtn.className;
                btn.textContent = this.selectedStateBtn.text;
                if (this.selectedCapresId) {
                  await deleteVoter(this.selectedCapresId, this.voterId);
                }
                this.selectedCapresId = no;
                await postVoter(this.selectedCapresId, this.voterId);
              });

              const [voteCountState, setVoteCount] = usingState(0);
              setInterval(async () => {
                const count = await getCountVoters(no);
                setVoteCount(count);
              }, 1000);
              return (
                <article className={`bg-gradient-to-br bg-indigo-100 p-3 mb-3 rounded-2xl w-[320px] max-w-full flex flex-col items-start`}>
                  <div className="w-full bg-indigo-50 rounded-xl" style={{ background: 'linear-gradient(to bottom, rgb(238, 242, 255), rgb(224, 231, 255))' }}>
                    <img src={calo.image} alt={'Profile ' + calo.nama} className="mt-[-40px]" />
                    <div className="bg-indigo-800 px-4 py-1 relative rounded-b-2xl">
                      <span className="text-lg font-semibold text-white italic">Voters</span>
                      <h2 className="absolute top-[-100%] right-4 py-2 px-3 rounded-md shadow-md text-indigo-900 skew-y-[-4deg] italic bg-indigo-200 text-4xl font-semibold">{voteCountState}</h2>
                    </div>
                  </div>
                  <h1 className="text-2xl font-semibold text-indigo-900 mt-3">{calo.nama}</h1>
                  <p className="text-[#456] font-medium mb-4">{calo.partai}</p>
                  {btn}
                </article>
              );
            })}
          </div>
        </main>
        <this.Footer />
      </div >
    );
  }

  async onConnected() {
    await fullyPrepared();
    const capresId = await findCapresId(this.voterId);
    if (capresId) {
      this.clearSelectBtns();
      this.element.querySelectorAll('main article > button').forEach((btn) => {
        if (btn.capresId == capresId) {
          btn.className = this.selectedStateBtn.className;
          btn.textContent = this.selectedStateBtn.text;
          this.selectedCapresId = capresId;
        }
      });
    }
  }
};

export default App;
