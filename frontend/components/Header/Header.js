export const Header = () => {
    const headerElement = document.createElement('header');
    headerElement.innerHTML = `
        <div class="Header">
        <section class="logo_and_btn_container" >        
            <ul class="logo">
                <li><img src="../../assets/icons/logo.svg" alt=""></li>
                <li>Therapy Cup Spa</li>
            </ul>
            <ul class="login_button">
                <li>
                    <button>Вхід</button>
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
    return headerElement;
};
