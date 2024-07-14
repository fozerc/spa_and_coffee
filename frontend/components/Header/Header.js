export const Header = ({API, State}) => {
        const {request} = API;
        const {initialState, updateState} = State;
        const headerElement = document.createElement('header');

        const getTeas = async () => {
            await request({
                type: 'get',
                path: 'teas',
                updateState
            })
        }

        const getCoffee = async () => {
            await request({
                type: 'get',
                path: 'coffee',
                updateState
            })
        }

        const getDesserts = async () => {
            await request({
                type: 'get',
                path: 'desserts',
                updateState
            })
        }

        const getSpecial = async () => {
            await request({
                type: 'get',
                path: 'special',
                updateState
            })
        }

        const getGallerySpa = async () => {
            await request({
                type: 'get',
                path: 'gallerySpa',
                updateState
            })
        }

        const getGalleryCafe = async () => {
            await request({
                type: 'get',
                path: 'galleryCafe',
                updateState
            })
        }

        const getGalleryProcess = async () => {
            await request({
                type: 'get',
                path: 'galleryProcess',
                updateState
            })
        }

        const getGalleryBathhouse = async () => {
            await request({
                type: 'get',
                path: 'galleryBathhouse',
                updateState
            })
        }

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
                        <li class="nav_links" id="photoGalleryButton">Фотогаллерея</li>
                        <li class="nav_links" id="coffeeShopButton">Кав'ярня</li>
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
            attachCoffeeShopButtonOnClickHandler();
            attachToGalleryButtonOnClickHandler();
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

        const renderGalleryImages = (images) => {
            const images_for_render = images.map((image) => `
            <div class="images_card">                
                <img src="${image.image}" alt="">
            </div>
                
            `).join(' ')

            return `
                <section class="images_section">
                    <div class="images_container">
                        ${images_for_render}
                    </div>
                </section>
            `
        }

        const renderGalleryPageGreetings = async () => {
            return `
            <section class="greetings_gallery_image_section">
            </section>
            <section class="greetings_gallery_section">
                <div class="greetings_gallery_heading">
                    <h2>Занурьтеся в світ розкішної гармонії: Наша Фотогалерея СПА-процедур<h2/>                    
                </div>
                <div class="greetings_gallery_container">
                    <p>Відчуйте емоцію розкоші та відпочинку, переглядаючи наші фотографії з обстановкою нашого СПА. Дозвольте собі відірватися від буденності та насолодитися красою і розкішшю кожної деталі наших процедур та облаштування.</p>                
                </div>
            </section>
        `
        }

        const renderGalleryPage = async (mainContent) => {
            return `
            <header class="gallery_header">
                <div class="logo_container">
                    <ul>
                        <li><img src="../../assets/icons/logo.svg" alt=""></li>
                        <li>Theraphy Cup Spa</li>
                    </ul>
                </div>
                <div class="navigation_container">
                    <ul class="navigation">
                        <li class="nav_links" id="spaButton">Спа</li>
                        <li class="nav_links" id="cafeGalleryButton">Кав’ярня</li>
                        <li class="nav_links" id="processGalleryButton">Процес</li>
                        <li class="nav_links" id="bathhouseButton">Баня</li>
                    </ul>
                </div>
            </header>
            <main class="gallery_main">
                ${mainContent}
            </main>
            <footer class="gallery_footer">
                <section class="footer_gallery_section">
                <h1 class="heading">Контакти</h1>
                <div class="line"></div>
                <div class="contacts_container">
                    <ul>
                        <li>Theraphy Cup Spa, s.r.o.</li>
                        <li>Recepce +420776652345</li>
                        <li>IČ: 05682606</li>
                        <li>DIČ: CZ05782303</li>
                        <li>Fakturační adresa: Na Lysině 678/25, 147 00, Praha 4, Česká republika</li>
                    </ul>
                </div>
                <div class="Footer">
                <ul class="navigation">
                        <li class="nav_links">Новини</li>
                        <li class="nav_links">Блог</li>
                        <li class="nav_links" id="photoGalleryButton">Фотогаллерея</li>
                        <li class="nav_links" id="coffeeShopButton">Кав'ярня</li>
                        <ul class="social_accounts">
                            <li><img src="../../assets/icons/inst.svg" alt=""></li>
                            <li><img src="../../assets/icons/facebook.svg" alt=""></li>
                            <li><img src="../../assets/icons/wats.svg" alt=""></li>
                        </ul>
                    </ul>
                <section class="logo_and_btn_container" >        
                    <ul class="logo">
                        <li><img src="../../assets/icons/logo.svg" alt=""></li>
                        <li>Therapy Cup Spa</li>
                    </ul>
                </section>
            </section>
            </footer>
        `
        }

        const attachToGalleryButtonOnClickHandler = () => {
            document.querySelector("#photoGalleryButton").addEventListener('click', async (event) => {
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderGalleryPage(await renderGalleryPageGreetings());
                bodyElement.innerHTML = `
            ${main_content}
            `;
                attachCoffeeShopButtonOnClickHandler();
                attachToGalleryButtonOnClickHandler();
                attachSpaOnClickButtonHandler();
                attachCafeGalleryOnClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachBathhouseClickButtonHandler();
            });
        };

        const attachSpaOnClickButtonHandler = () => {
            document.querySelector("#spaButton").addEventListener('click', async (event) => {
                await getGallerySpa()
                const spa = initialState.gallerySpa.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderGalleryPage(renderGalleryImages(spa));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachCoffeeShopButtonOnClickHandler();
                attachToGalleryButtonOnClickHandler();
                attachSpaOnClickButtonHandler();
                attachCafeGalleryOnClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachBathhouseClickButtonHandler();
            })
        }

        const attachCafeGalleryOnClickButtonHandler = () => {
            document.querySelector("#cafeGalleryButton").addEventListener('click', async (event) => {
                await getGalleryCafe()
                const cafe = initialState.galleryCafe.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderGalleryPage(renderGalleryImages(cafe));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachCoffeeShopButtonOnClickHandler();
                attachToGalleryButtonOnClickHandler();
                attachSpaOnClickButtonHandler();
                attachCafeGalleryOnClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachBathhouseClickButtonHandler();
            })
        }

        const attachProcessGalleryClickButtonHandler = () => {
            document.querySelector("#processGalleryButton").addEventListener('click', async (event) => {
                await getGalleryProcess()
                const process = initialState.galleryProcess.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderGalleryPage(renderGalleryImages(process));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachCoffeeShopButtonOnClickHandler();
                attachToGalleryButtonOnClickHandler();
                attachSpaOnClickButtonHandler();
                attachCafeGalleryOnClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachBathhouseClickButtonHandler();
            })
        }

        const attachBathhouseClickButtonHandler = () => {
            document.querySelector("#bathhouseButton").addEventListener('click', async (event) => {
                await getGalleryBathhouse()
                const bathhouse = initialState.galleryBathhouse.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderGalleryPage(renderGalleryImages(bathhouse));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachCoffeeShopButtonOnClickHandler();
                attachToGalleryButtonOnClickHandler();
                attachSpaOnClickButtonHandler();
                attachCafeGalleryOnClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachProcessGalleryClickButtonHandler();
                attachBathhouseClickButtonHandler();
            })
        }

        const renderCoffeePageGreetings = async () => {
            return `
            <section class="greetings_image_section">
            </section>
            <section class="greetings_section">
                <div class="greetings_heading">
                    <h2>Ласкаво просимо до нашої кав'ярні у спа-салоні!<h2/>                    
                </div>
                <div class="greetings_container">
                    <p> Поглибіть своє відчуття розкоші та задоволення, насолоджуйтеся ароматним кавовим напоєм у затишній атмосфері нашого закладу. У нашій кав'ярні ви зможете насолодитися широким вибором свіжообсмажених кавових зерен, найкращими чаєвими сортами та апетитними десертами - все це для вашого відпочинку та задоволення. Завітайте до нас сьогодні та даруйте собі миті насолоди та розслаблення!</p>                
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
                        <li class="nav_links" id="teasButton">Чаї</li>
                        <li class="nav_links" id="coffeeButton">Кава</li>
                        <li class="nav_links" id="dessertsButton">Десерти</li>
                        <li class="nav_links" id="specialOffersButton">Спеціальні пропозиції</li>
                    </ul>
                </div>
            </header>
            <main>
                ${mainContent}
            </main>
            <footer>
                <section class="footer_section">
                <h1 class="heading">Контакти</h1>
                <div class="line"></div>
                <div class="contacts_container">
                    <ul>
                        <li>Theraphy Cup Spa, s.r.o.</li>
                        <li>Recepce +420776652345</li>
                        <li>IČ: 05682606</li>
                        <li>DIČ: CZ05782303</li>
                        <li>Fakturační adresa: Na Lysině 678/25, 147 00, Praha 4, Česká republika</li>
                    </ul>
                </div>
                <div class="Footer">
                <ul class="navigation">
                        <li class="nav_links">Новини</li>
                        <li class="nav_links">Блог</li>
                        <li class="nav_links" id="photoGalleryButton">Фотогаллерея</li>
                        <li class="nav_links" id="coffeeShopButton">Кав'ярня</li>
                        <ul class="social_accounts">
                            <li><img src="../../assets/icons/inst.svg" alt=""></li>
                            <li><img src="../../assets/icons/facebook.svg" alt=""></li>
                            <li><img src="../../assets/icons/wats.svg" alt=""></li>
                        </ul>
                    </ul>
                <section class="logo_and_btn_container" >        
                    <ul class="logo">
                        <li><img src="../../assets/icons/logo.svg" alt=""></li>
                        <li>Therapy Cup Spa</li>
                    </ul>
                </section>
            </section>
            </footer>
        `
        }

        const renderCafeProducts = (products) => {
            const product_for_render = products.map((product) => `
            <div class="products_card">                
                <div class="product_image">
                    <div class="product_img"><img src="${product.image}" alt=""></div>
                </div>
                <div class="product">
                    <ul class="product_name_price">
                        <li>${product.name}</li>
                        <li>${product.price} грн</li>
                    </ul>
                    <ul class="product_desc">
                        <li>Склад: ${product.compound}</li>
                        <li>Опис: ${product.description}</li>
                    </ul>
                </div>
            </div>
                
            `).join(' ')

            return `
                <section class="products_section">
                    <div class="products_container">
                        ${product_for_render}
                    </div>
                </section>
            `
        }

        const attachCoffeeShopButtonOnClickHandler = () => {
            document.querySelector("#coffeeShopButton").addEventListener('click', async (event) => {
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderCoffeePage(await renderCoffeePageGreetings());
                bodyElement.innerHTML = `
            ${main_content}
            `;
                attachTeasOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachDessertsOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachCoffeeShopButtonOnClickHandler()
                attachToGalleryButtonOnClickHandler();
            });
        };


        const attachCoffeeOnClickButtonHandler = () => {
            document.querySelector("#coffeeButton").addEventListener('click', async (event) => {
                await getCoffee()
                const coffees = initialState.coffee.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderCoffeePage(renderCafeProducts(coffees));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachTeasOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachDessertsOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachCoffeeOnClickButtonHandler()
                attachCoffeeShopButtonOnClickHandler()
                attachToGalleryButtonOnClickHandler();
            })
        }


        const attachDessertsOnClickButtonHandler = () => {
            document.querySelector("#dessertsButton").addEventListener('click', async (event) => {
                await getDesserts()
                const desserts = initialState.desserts.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderCoffeePage(renderCafeProducts(desserts));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachTeasOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachDessertsOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachCoffeeOnClickButtonHandler()
                attachCoffeeShopButtonOnClickHandler()
                attachToGalleryButtonOnClickHandler();
            })
        }

        const attachSpecialOffersOnClickButtonHandler = () => {
            document.querySelector("#specialOffersButton").addEventListener('click', async (event) => {
                await getSpecial()
                const special = initialState.special.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderCoffeePage(renderCafeProducts(special));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachTeasOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachDessertsOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachCoffeeOnClickButtonHandler()
                attachCoffeeShopButtonOnClickHandler()
                attachToGalleryButtonOnClickHandler();
            })
        }

        const attachTeasOnClickButtonHandler = () => {
            document.querySelector("#teasButton").addEventListener('click', async (event) => {
                await getTeas()
                const teas = initialState.teas.data
                const bodyElement = document.body;
                bodyElement.innerHTML = ''
                const main_content = await renderCoffeePage(renderCafeProducts(teas));
                bodyElement.innerHTML = `
                    ${main_content}
                `;
                attachTeasOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachDessertsOnClickButtonHandler()
                attachSpecialOffersOnClickButtonHandler()
                attachCoffeeOnClickButtonHandler()
                attachCoffeeShopButtonOnClickHandler()
                attachToGalleryButtonOnClickHandler();
            })
        }

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