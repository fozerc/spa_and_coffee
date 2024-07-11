export const Footer = ({API, State}) => {
    const request = API
    const {initialState, updateState} = State;
    const footerElement = document.createElement('footer')

    const renderPage = async () => {
        return `
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
                <section class="logo_and_btn_container" >        
                    <ul class="logo">
                        <li><img src="../../assets/icons/logo.svg" alt=""></li>
                        <li>Therapy Cup Spa</li>
                    </ul>
                </section>
            </section>
                `
    }

    const renderFooter = async () => {
        const [ FooterHtml ] = await Promise.all([renderPage()])
        footerElement.innerHTML = `
            ${FooterHtml}
        `
    }

    renderFooter()

    return footerElement
}