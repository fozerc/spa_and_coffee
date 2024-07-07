import axios from "axios";
import {paths} from "../../api/paths";

export const Main = ({API, State}) => {
    const {request} = API;
    const {initialState, updateState} = State;

    const getTypeOfProcedures = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/procedure-category/');
            return response.data
        } catch (error) {
            console.error("Can't get an objects", error);
            return [];
        }
    };

    const renderProceduresCategory = (categories) => {
        return categories.map(({name, description, image}, index) => `
            <div class="procedures_type">
                <ul class="category${index}">
                    <li>${name}</li>
                    <li>${description}</li>
                    <li><img src="${image}" alt=""></li>
                </ul>
                <ul class="category_buttons">
                    <li>Дізнатися більше</li>
                    <li>
                        <button>Записатись</button>
                    </li>
                </ul>
            </div>
        `).join('');
    };

    const RegisterForm = () => {
        return `
            <form id="RegisterForm">
                <input id="username" type="text" autocomplete="username" name="username" placeholder="Username" />
                <input id="password" type="password" autocomplete="current-password" name="password" placeholder="Password" />
                <input id="email" type="email" autocomplete="email" name="email" placeholder="Email" />
                <input type="submit" value="Register"/>
            </form>
        `;
    };

    const mainPage = async () => {
        const categories = await getTypeOfProcedures();
        console.log(categories)
        return `
            <section class="about_us_section">
                <h1 class="about_us_heading">Про нас</h1>
                <div class="about_us_line"></div>
                <div class="about_us">
                    <div class="about_us_container">
                        <ul>
                            <li>Вітаємо вас у нашому унікальному закладі, де кожен куток пронизаний атмосферою затишку та релаксу.  Тут ви зможете забути про гамір міста та щоденні турботи, поринаючи у світ бажань і задоволення. Наша місія - дарувати вам не лише приємні моменти, а й дбати про ваше благополуччя та здоров'я. Ви гість у нашому світі і ми готові зробити все для вашої гармонії та насолоди.</li>
                            <li>Ми створили атмосферу, де ви відчуєте себе особливим, де кожен ковток кави і спа-ритуал стане чарівною миттю для вас.</li>
                            <li>Для нас кожен гість унікальний, тому пропонуємо індивідуальні програми спа-процедур та персоналізовані кавові напої.</li>
                            <li>Ми пропонуємо широкий спектр спа-процедур, від масажів до ексклюзивних обгортань, а також різноманітні пропарки та церемонії.</li>
                        </ul>    
                    </div>
                    <div class="about_us_images">
                        <ul>
                            <li><img src="../../assets/images/about_us1.svg" alt=""></li>
                            <li><img src="../../assets/images/about_us2.svg" alt=""></li>
                            <li><img src="../../assets/images/about_us.svg" alt=""></li>
                        </ul>
                    </div>
                </div>
            </section> 
            <section class="philosophy_section">
                <div class="philosophy_container">
                    <h2 class="philosophy_heading">Філософія</h2>
                    <div class="about_us_line"></div>
                    <div class="philosophy_description">
                        <ul class="description">
                            <li><img src="../../assets/icons/philosophy2.svg" alt=""></li>
                            <li>Еко стратегії</li>
                            <li>Ми впроваджуємо екологічно чисті технології та використовуємо натуральні, органічні продукти, щоб забезпечити не лише ефективність процедур, а й безпеку для навколишнього середовища. Наші інноваційні рішення допомагають зменшити вплив на природу, зберігаючи її красу для майбутніх поколінь.</li>
                        </ul>
                        <ul class="description1">
                            <li><img src="../../assets/icons/philosophy1.svg" alt=""></li>
                            <li>Професійний догляд</li>
                            <li>Кваліфіковані спеціалісти в курсі останніх тенденцій і технік. Вони розуміють унікальні потреби клієнта і завжди готові надати індивідуальні рекомендації та високоякісний сервіс. Працюють з великим старанням, щоб забезпечити вам найкращі результати і незабутні враження від кожного візиту до нашого спа-салону.</li>
                        </ul>
                        <ul class="description2">
                            <li><img src="../../assets/icons/philosophy.svg" alt=""></li>
                            <li>Індивідуальний підхід</li>
                            <li>Наші спеціалісти пропонують індивідуальний підхід до кожного клієнта, враховуючи всі особливості вашої шкіри та розробляючи унікальні програми догляду, адаптовані до ваших потреб. Це поєднання дозволяє досягти найкращих результатів і забезпечує максимальний ефект від процедур.</li>
                        </ul>
                    </div>
                </div>
                <section class="category_section">
                    <div class="category_container">
                        <h3 class="category_heading">Послуги</h3>
                        <div class="about_us_line"></div>
                        <div class="categories">
                            ${renderProceduresCategory(categories)}
                        </div>
                    </div>
                </section>
            </section>
        `;
    };

    const mainElement = document.createElement('main');

    const renderPage = async () => {
        const [registerHtml, anotherHtml] = await Promise.all([RegisterForm(), mainPage()]);
        mainElement.innerHTML = `
            ${anotherHtml}
            ${registerHtml}
        `;
        attachFormSubmitHandler();
    };

    const attachFormSubmitHandler = () => {
        document.querySelector("#RegisterForm").addEventListener("submit", async (event) => {
            event.preventDefault();

            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;
            const email = document.querySelector("#email").value;

            const data = {
                username,
                password,
                email,
            };

            await request({
                type: "post",
                path: "register",
                data,
                updateState,
            });

            console.log(initialState);
        });
    };

    renderPage();

    return mainElement;
};
