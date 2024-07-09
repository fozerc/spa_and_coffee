import axios from "axios";
import {paths} from "../../api/paths";

export const Main = ({API, State}) => {
    const {request} = API;
    const {initialState, updateState} = State;


    const getTypeOfProcedures = async () => {
        try {
            await request({
                type: "get",
                path: "procedureCategory",
                updateState
            });
        } catch (error) {
            console.error("Error getting procedure categories:", error);
        }
    };

    const renderProceduresCategory = (categories = []) => {
        return categories.map(({name, description, image}) => `
            <div class="procedures_type">
                <ul class="category">
                    <li><img src="${image}" alt=""></li>
                    <li>${name}</li>
                    <li>${description}</li>
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

    const getEmployees = async () => {
        try {
            await request({
                type: "get",
                path: "employee",
                updateState
            });
        } catch (error) {
            console.error("Error in getting employees", error)
        }
    }

    const renderEmployee = (employees) => {
        return employees.map(({name, role, photo}, index) => `
            <div class="employees_type${index}">
                <ul class="employee_card">
                    <li><img src="${photo}" alt=""></li>
                    <li>${name}</li>
                    <li>${role}</li>
                </ul>
            </div>   
        `).join('')
    }

    const getReviews = async () => {
        try {
            await request({
                type: "get",
                path: "review",
                updateState
            })
        } catch (error) {
            console.error("Error can't get an reviews", error)
        }
    }

    const renderReviews = (reviews) => {
        return reviews.map(({user, therapist, comment, rating, image}) => `
            <div class="review_card">
                <ul class="review_name_and_photo">
                    <li>${user}</li>
                    <li><img src="${image}" alt=""></li>
                </ul>
                <ul>
                    <li>${therapist}</li>
                    <li>${comment}</li>
                    <li>${rating}</li>
                </ul>
            </div>   
        `)
    }

    const logout = async () => {
        const token = localStorage.getItem('authtoken')
        if (token) {
            try {
                request({
                    type: "post",
                    path: "logout",
                })
            }catch (error){
                console.error(error)
            }
        }
    }

    const employeesForForm = (employees) => {
        return employees.map(({id, name}) => `
            <option value="${id}">${name}</option>
        `).join('');
    }

    const mainPage = async () => {
        await getReviews()
        await getTypeOfProcedures();
        await getEmployees()
        const categories = initialState.procedureCategory.data;
        const employees = initialState.employee.data
        const reviews = initialState.review.data
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
                <section class="employees_section">
                    <div class="employees_container">
                        <h4 class="category_heading">Спеціалісти</h4>
                        <div class="about_us_line"></div>
                        <div class="employees">
                            ${renderEmployee(employees)}
                        </div>
                    </div>
                </section>
                <section class="why_us_section">
                    <h5 class="category_heading">Чому саме ми?</h5>
                    <div class="about_us_line"></div>
                    <div class="why_us_container">
                        <ul>
                            <li>Якість</li>
                            <li>Наш спа-салон забезпечує найвищу якість послуг завдяки кваліфікованим спеціалістам, індивідуальному підходу та використанню новітніх технологій і органічних продуктів.</li>
                        </ul><ul>
                            <li>Ефективність</li>
                            <li>Ефективність наших спа-процедур полягає в поєднанні передових методик, індивідуально підібраних програм і ретельно відібраних продуктів, що гарантують тривалі та помітні результати.</li>
                        </ul><ul>
                            <li>Безпека</li>
                            <li>Безпека нашого спа-салону забезпечується дотриманням найвищих стандартів гігієни, використанням екологічно чистих продуктів і суворим контролем якості процедур</li>
                        </ul>
                    </div>
                </section>
                <section class="reviews_section">
                    <h6 class="category_heading">Відгуки</h6>
                    <div class="about_us_line"></div>
                    <div class="reviews_container">
                        ${renderReviews(reviews)}
                    </div>
                    <div class="review_form_and_logo_container">
                        ${reviewForm(employees)}
                    </div>
                </section>
            </section>
        `;
    };


    const reviewForm = (employees) => {
        return `
            <form id="reviewForm">
                    <select name="employee" id="employeeSelect">
                        ${employeesForForm(employees)}                  
                    </select>    
                <input type="text" name="review" id="review" placeholder="Відгук">
                <input type="number" id="rating" min="1" max="5" step="1" placeholder="Rating (1-5)" required>
                <input type="submit" id="review_submit" name="review_submit" value="Відправити">
            </form>
        `
    }

    const mainElement = document.createElement('main');

    const renderPage = async () => {
        const [registerHtml, anotherHtml] = await Promise.all([RegisterForm(), mainPage()]);
        mainElement.innerHTML = `
            ${anotherHtml}
            ${registerHtml}
        `;
        attachReviewFormSubmitHandler();
        attachRegisterFormSubmitHandler();
    };

    const attachReviewFormSubmitHandler = () => {
        document.querySelector("#reviewForm").addEventListener('submit', async (event) => {
            event.preventDefault()
            const comment = document.querySelector("#review").value;
            const rating = document.querySelector("#rating").value;
            const therapist = document.querySelector("#employeeSelect").value;

            if (!Number.isInteger(Number(rating)) || rating < 1 || rating >5){
                alert("Please enter a valid rating between 1 and 5.")
            }

            const data = {
                comment,
                rating,
                therapist
            };

            await request({
                type: "post",
                path: "review",
                data,
                updateState,
            });

            console.log(initialState)
        })
    }

    const attachRegisterFormSubmitHandler = () => {
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
