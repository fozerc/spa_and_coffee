export const Header = ({API, State}) => {
        const {request} = API;
        const {initialState, updateState} = State;
        const headerElement = document.createElement('header');

        const isUserLoggedIn = () => {
            return !!localStorage.getItem('authtoken')
        }

        const headerPage = async () => {
            return `
                <div class="Header">
                <section class="logo_and_btn_container" >        
                    <ul class="logo">
                        <li><img src="../../assets/icons/logo.svg" alt=""></li>
                        <li>Therapy Cup Spa</li>
                    </ul>
                    ${!isUserLoggedIn() ? `
                        <ul class="login_button">
                            <li>
                                <button id="LogInButton">Вхід</button>
                            </li>
                        </ul>` : `
                        <ul class="log_out_button">
                            <li>
                                <button id="LogOutButton">Вихід</button>
                            </li>
                        </ul>     
                        `}
                </section>
                    <ul class="navigation">
                        <li class="nav_links">Новини</li>
                        <li class="nav_links">Блог</li>
                        <li class="nav_links">Фотогаллерея</li>
                        <li class="nav_links" id="coffeeButton">Кав'ярня</li>
                        <ul class="social_accounts">
                            <li><img src="../../assets/icons/inst.svg" alt=""></li>
                            <li><img src="../../assets/icons/facebook.svg" alt=""></li>
                            <li><img src="../../assets/icons/wats.svg" alt=""></li>
                        </ul>
                    </ul>
                    <section class="main_page_button_section">
                        <ul class="main_page_button_container">
                            <li>
                                <button id="register_btn">Зареєструватися</button>
                            </li>
                            <li>SPA-терапія</li>
                            <li>Подаруйте собі миті насолоди</li>
                        </ul>
                    </section>
                </div>
            `;
        }


        const renderHeader = async () => {
            const [headerHtml] = await Promise.all([headerPage()]);
            headerElement.innerHTML = `
            ${headerHtml}
        `;
            attachRegisterButtonOnClickHandler();
            attachCoffeeButtonOnClickHandler();
            if (!isUserLoggedIn()) {
                attachLogInButtonOnClickHandler();
            } else {
                attachLogOutButtonOnClickHandler();
            }
        }

        const logInForm = () => {
            const formContainer = document.createElement('div');
            formContainer.className = 'logInFormContainer';
            formContainer.innerHTML = `
            <div class="login_form_background">
                <h1 class="login_heading">Вхід</h1>
                <form id="logInForm">
                    <input id="username" type="text" autocomplete="username" name="username" placeholder="Username" class="username_inp"/>
                    <input id="password" type="password" autocomplete="current-password" name="password" placeholder="Password" class="password_inp"/>
                    <input type="submit" value="ВХІД" class="submit_btn"/>
                </form>
            </div>
        `
            return formContainer
        }

        const renderCoffeePageGreetings = async () => {
            return `
            <section class="greetings_image_section">
            </section>
            <section class="greetings_section">
                <div class="greetings_container">
                    <ul>
                        <li>Ласкаво просимо до нашої кав'ярні у спа-салоні!</li>
                        <li> Поглибіть своє відчуття розкоші та задоволення, насолоджуйтеся ароматним кавовим напоєм у затишній атмосфері нашого закладу. У нашій кав'ярні ви зможете насолодитися широким вибором свіжообсмажених кавових зерен, найкращими чаєвими сортами та апетитними десертами - все це для вашого відпочинку та задоволення. Завітайте до нас сьогодні та даруйте собі миті насолоди та розслаблення!</li>
                    </ul>
                </div>
            </section>
        `
        }

        const renderCoffeePage = async (mainContent) => {
            return `
            <header>
                <div class="logo_container">
                    <ul>
                        <li><img src="../../assets/icons/logo.svg" alt=""></li>
                        <li>Theraphy Cup Spa</li>
                    </ul>
                </div>
                <div class="navigation_container">
                    <ul class="navigation">
                        <li class="nav_links">Чаї</li>
                        <li class="nav_links">Кава</li>
                        <li class="nav_links">Десерти</li>
                    </ul>
                </div>
            </header>
            <main>
                ${mainContent}
            </main>
            <footer>
            </footer>
        `
        }

        const attachCoffeeButtonOnClickHandler = () => {
            document.querySelector("#coffeeButton").addEventListener('click', async (event) => {
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderCoffeePage(await renderCoffeePageGreetings());
                bodyElement.innerHTML = `
            ${main_content}
            `;
            });
        };

        const attachLogOutButtonOnClickHandler = () => {
            const logOutButton = document.querySelector('#LogOutButton');
            if (logOutButton) {
                logOutButton.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await request({
                        type: "post",
                        path: "logout",
                        updateState,
                    });
                    localStorage.removeItem('authtoken');
                    alert('Successfully logged out!');
                    window.location.reload();
                });
            } else {
                console.error("LogOutButton not found");
            }
        };
        const registerForm = () => {
            const formContainer = document.createElement('div')
            formContainer.className = 'register_container'
            formContainer.innerHTML = `
                <div class="register_form_background">
                    <h1 class="register_heading">Реєстрація</h1>        
                    <form id="RegisterForm">
                        <input id="username" type="text" autocomplete="username" name="username" placeholder="Username" class="username_inp"/>
                        <input id="password" type="password" autocomplete="current-password" name="password" placeholder="Password" class="password_inp"/>
                        <input id="email" type="email" autocomplete="email" name="email" placeholder="Email" class="email_inp"/>
                        <input id="phone" type="tel" autocomplete="phone" name="phone" placeholder="Number" class="number_inp"/>
                        <input type="submit" value="Register" class="submit_btn"/>
                    </form>
                </div>  
                `;
            return formContainer
        };

        const attachRegisterFormSubmitHandler = () => {
            document.querySelector("#RegisterForm").addEventListener("submit", async (event) => {
                event.preventDefault();
                const username = document.querySelector("#username").value;
                const password = document.querySelector("#password").value;
                const email = document.querySelector("#email").value;
                const phone = document.querySelector("#phone").value;

                const data = {
                    username,
                    password,
                    email,
                    phone
                };
                try {
                    await request({
                        type: "post",
                        path: "register",
                        data,
                        updateState,
                    });
                    alert("Successfully registered!")
                    window.location.reload()
                } catch (error) {
                    alert("fill in all required fields.")
                }
                console.log(initialState);
            });
        };

        const attachRegisterButtonOnClickHandler = () => {
            document.querySelector('#register_btn').addEventListener('click', async (event) => {
                const bodyElement = document.body
                bodyElement.innerHTML = ''
                bodyElement.appendChild(registerForm())
                attachRegisterFormSubmitHandler()
            })
        }

        const attachLogInButtonOnClickHandler = () => {
            document.querySelector('#LogInButton').addEventListener('click', async (event) => {
                const bodyElement = document.body
                bodyElement.innerHTML = ''
                bodyElement.appendChild(logInForm())
                attachLogInOnSubmitHandler()
            })
        }

        const attachLogInOnSubmitHandler = () => {
            document.querySelector('#logInForm').addEventListener('submit', async (event) => {
                event.preventDefault()
                const username = document.querySelector('#username').value
                const password = document.querySelector('#password').value

                const data = {
                    username,
                    password,
                }

                try {
                    await request({
                        type: "post",
                        path: "auth",
                        data,
                        updateState
                    })
                    alert('Successfully logged in!');
                    window.location.reload();
                } catch (error) {
                    alert('Wrong username or password, please try again.')
                }
                console.log(initialState)
            })
        }

        renderHeader()

        return headerElement
    }
;