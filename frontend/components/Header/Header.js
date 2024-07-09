export const Header = ({API, State}) => {
    const {request} = API;
    const {initialState, updateState} = State;
    const headerElement = document.createElement('header');

    const headerPage = () => {
        return `
        <div class="Header">
        <section class="logo_and_btn_container" >        
            <ul class="logo">
                <li><img src="../../assets/icons/logo.svg" alt=""></li>
                <li>Therapy Cup Spa</li>
            </ul>
            <ul class="login_button">
                <li>
                    <button id="LogInButton">Вхід</button>
                </li>
            </ul>
        </section>
            <ul class="navigation">
                <li class="nav_links">Новини</li>
                <li class="nav_links">Акції та пропозиції</li>
                <li class="nav_links">Блог</li>
                <li class="nav_links">Фотогаллерея</li>
                <li class="nav_links">Кав'ярня</li>
                <ul class="social_accounts">
                    <li><img src="../../assets/icons/inst.svg" alt=""></li>
                    <li><img src="../../assets/icons/facebook.svg" alt=""></li>
                    <li><img src="../../assets/icons/wats.svg" alt=""></li>
                </ul>
            </ul>
            <section class="main_page_button_section">
                <ul class="main_page_button_container">
                    <li>
                        <button>Зареєструватися</button>
                    </li>
                    <li>SPA-терапія</li>
                    <li>Подаруйте собі миті насолоди</li>
                </ul>
            </section>
        </div>
    `;
    }

    const renderHeader =  async () => {
        const [headerHtml] = await Promise.all([headerPage()]);
        headerElement.innerHTML = `
            ${headerHtml}
        `;
        attachLogInButtonOnClickHandler()
    }

    const logInForm = () => {
        const formContainer = document.createElement('div');
        formContainer.className = 'logInFormContainer';
        formContainer.innerHTML = `
            <div class="login_form_background">            
                <form id="logInForm">
                    <input id="username" type="text" autocomplete="username" name="username" placeholder="Username" />
                    <input id="password" type="password" autocomplete="current-password" name="password" placeholder="Password" />
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        `
        return formContainer
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
        document.querySelector('#logInForm').addEventListener('submit', async (event) =>{
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
            }catch (error){
                alert('Wrong username or password, please try again.')
            }
            console.log(initialState)
        })
    }


    renderHeader()

    return headerElement
};