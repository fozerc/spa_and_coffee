import axios from "axios";
import {paths} from "../../api/paths";
import flatpickr from "flatpickr";

export const Main = ({API, State}) => {
    const {request} = API;
    const {initialState, updateState} = State;

    const getTypeOfProcedures = async () => {
        await request({
            type: "get",
            path: "procedureCategory",
            updateState
        });
    };

    let selectedProcedure = null;
    let selectedEmployee = null;
    let selectedDate = null;
    let selectedScheduleId = null;

    const getRoles = async () => {
        await request({
            type: "get",
            path: "role",
            updateState
        });
    };

    const getEmployees = async () => {
        await request({
            type: "get",
            path: "employee",
            updateState
        });
    };

    const renderProceduresCategory = (categories = []) => {
        return categories.map(({name, description, image}, index) => `
                <div class="procedures_type">
                    <ul class="category">
                        <li><img src="${image}" alt=""></li>
                        <li>${name}</li>
                        <li>${description}</li>
                    </ul>
                    <ul class="category_buttons">
                        <li>Дізнатися більше</li>
                        <li>
                            <button id="ProceduresButton${index}">Записатись</button>
                        </li>
                    </ul>
                </div>
            `).join('');
    };

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
                        <li><img src="${image}" alt=""></li>
                        <li>${user}</li>
                    </ul>
                    <ul class="review_comment">
                        <li>Терапевт: ${therapist}</li>
                        <li>Відгук: ${comment}</li>
                        <li>Рейтинг: ${rating}</li>
                    </ul>
                </div>   
            `).join(' ')
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
                            <div class="review_form_container">
                            <h6 class="review_heading">Ви можете залишити свій відгук на нашому сайті</h6>
                                ${reviewForm(employees)}                        
                            </div>
                            <div class="review_logo_container">
                                <ul>
                                    <li><img src="../../assets/icons/half_logo.svg" alt=""></li>
                                    <li><img src="../../assets/icons/TC&Spa.svg" alt=""></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </section>
            `;
    };


    const reviewForm = (employees) => {
        return `
                <form id="reviewForm">
                        <select name="employee" id="employeeSelect" class="employee_select">
                            ${employeesForForm(employees)}                  
                        </select>    
                    <input type="text" name="review" id="review" placeholder="Відгук" class="text_review_inp">
                    <input type="number" id="rating" min="1" max="5" step="1" placeholder="Rating (1-5)" required>
                    <input type="submit" id="review_submit" name="review_submit" value="Відправити" class="send_btn">
                </form>
            `
    }

    const mainElement = document.createElement('main');

    const renderPage = async () => {
        const [anotherHtml] = await Promise.all([mainPage()]);
        mainElement.innerHTML = `
                ${anotherHtml}
            `;
        attachReviewFormSubmitHandler();
        attachMassageButtonOnClickHandler0()
        attachMassageButtonOnClickHandler2()
        attachMassageButtonOnClickHandler1()
        attachMassageButtonOnClickHandler3()
    };

    const getMassages = async () => {

        await request({
            path: "massages",
            type: "get",
            updateState
        });
    }

    const renderMassages = (massages) => {
        return massages.map(({name, description, price, duration, image}) => `
                <div class="massage_card">
                    <ul class="massage_desc">
                        <li><img src="${image}" alt=""></li>
                        <li>${name}</li>
                        <li>${description}</li>
                    </ul>
                    <ul class="massage_duration_and_price">
                        <li>Тривалість ${duration / 60} хв</li>
                        <li>${price} грн</li>
                    </ul>
                </div>
            `).join(' ')
    }

    const renderMassagesPage = async () => {
        await getMassages()
        const massages = initialState.massages.data
        return `
                <header>
                    <section class="massage_logo_section">
                        <ul class="logo">
                            <li><img src="../../assets/icons/logo.svg" alt=""></li>
                            <li>Therapy Cup Spa</li>
                        </ul>
                    </section>
                    <section class="navigation_section">
                        <ul class="massage_navigation_container">
                            <li>Массажі</li>
                            <li>Пілінги </li>
                            <li>Пропарки і обгортання</li>
                            <li>Церемонії</li>
                        </ul>
                    </section>
                </header> 
                <main id="main-content">            
                    <section class="massages_section">
                        <div class="massages_container">
                            ${renderMassages(massages)}
                        </div>
                    </section>
                    <section class="make_an_appointment_button">
                        <button id="makeAnAppointmentButton">Записатись</button>
                    </section>
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
                </footer>
            `
    }

    const attachMassageButtonOnClickHandler3 = () => {
        document.querySelector("#ProceduresButton3").addEventListener('click', async (event) => {
            const bodyElement = document.body
            bodyElement.innerHTML = ''
            const massagePage = await renderMassagesPage()
            bodyElement.innerHTML = `
                    ${massagePage}
                `
            attachMakeAnAppointmentButtonHandler()
        });
    }

    const attachMassageButtonOnClickHandler2 = () => {
        document.querySelector("#ProceduresButton2").addEventListener('click', async (event) => {
            const bodyElement = document.body
            bodyElement.innerHTML = ''
            const massagePage = await renderMassagesPage()
            bodyElement.innerHTML = `
                    ${massagePage}
                `
            attachMakeAnAppointmentButtonHandler()
        });
    }

    const attachMassageButtonOnClickHandler0 = () => {
        document.querySelector("#ProceduresButton0").addEventListener('click', async (event) => {
            const bodyElement = document.body
            bodyElement.innerHTML = ''
            const massagePage = await renderMassagesPage()
            bodyElement.innerHTML = `
                    ${massagePage}
                `
            attachMakeAnAppointmentButtonHandler()
        });
    }

    const attachMassageButtonOnClickHandler1 = () => {
        document.querySelector("#ProceduresButton1").addEventListener('click', async (event) => {
            const bodyElement = document.body
            bodyElement.innerHTML = ''
            const massagePage = await renderMassagesPage()
            bodyElement.innerHTML = `
                    ${massagePage}
                `
            attachMakeAnAppointmentButtonHandler()
        });
    }

    const getSchedules = async () => {
        await request({
            type: "get",
            path: "schedule",
            updateState
        });
    }

    const renderProcedureTypes = async () => {
        await request({
            type: "get",
            path: "procedureCategory",
            updateState
        });

        const categories = initialState.procedureCategory.data;
        const content = categories.map(({name, id}) => `
            <button class="procedure_type_button" data-category-id="${id}">${name}</button>
    `).join('');

        await renderMainContent(`
        <section class="procedures_type_section">
            <div class="procedures_type_container">
                ${content}
                <div class="choose_procedure">
                    <p>Виберіть потрібну вам категорію.</p>
                </div>
            </div>
        </section>
    `);

        document.querySelectorAll('.procedure_type_button').forEach((button) => {
            button.addEventListener('click', (event) => {
                const categoryId = parseInt(event.currentTarget.getAttribute('data-category-id'));
                const category = getCategoryById(categoryId)
                const rolesId = category.roles
                renderProcedures(rolesId, category);
            });
        });
    };

    function getCategoryById(id) {
        return initialState.procedureCategory.data.find(category => category.id === id);
    }

    const getRolesByIds = (state, roleIds) => {
        const roles = state.role.data;
        if (!roles) {
            return null;
        }

        return roleIds.map(roleId => roles.find(role => role.id === roleId)).filter(role => role !== undefined);
    }

    const renderProcedures = async (rolesId, category) => {
        const selectedCategory = category;
        await getRoles();
        const roles = getRolesByIds(initialState, rolesId);
        console.log(roles);

        const content = roles.map(({procedures, name}) => {
            const proceduresContent = procedures.map(({id, name, price, duration}) => `
            <label for="procedure_${id}" class="procedures_flex_container">
                <div class="procedure_pick_description">
                    ${name}
                    ${duration / 60} мин
                </div>
                <div class="procedure_price">
                    ${price} грн
                    <input type="radio" name="procedure" value="${id}" id="procedure_${id}">
                </div>
            </label>
        `).join('');

            return `
            ${proceduresContent}
        `;
        }).join('');

        await renderMainContent(`
        <section class="procedures_pick_section">
            <div class="procedures_pick_container">
                ${content}
                <button class="select_specialist_button" id="select_specialist_button">Вибрати спеціаліста</button>
            </div>
        </section>
    `);

        document.querySelectorAll('input[name="procedure"]').forEach((input) => {
            input.addEventListener('change', (event) => {
                selectedProcedure = event.target.value; // сохраняем выбранную процедуру
                console.log(selectedProcedure, roles);
            });
        });

        document.getElementById('select_specialist_button').addEventListener('click', () => {
            if (selectedProcedure) {
                renderEmployeesByCategory(selectedProcedure, roles);
            } else {
                alert('Будь ласка, виберіть процедуру.');
            }
        });
    };

    const renderEmployeesByCategory = (procedureId, roles) => {
        const allEmployees = initialState.employee.data; // Все работники из состояния
        const employeeIds = roles.flatMap(role =>
            role.procedures.some(procedure => procedure.id == procedureId) ? role.employees : []
        );

        const employees = allEmployees.filter(employee =>
            employeeIds.includes(employee.id)
        );

        const employeeContent = employees.map(employee => `
        <div class="employee">
            <div class="employee_data">        
                <img src="${employee.photo}" alt="">
                <p>Name: ${employee.name}</p>
                <p>Rating: ${employee.rating}</p>
            </div>
            <div class="book_button_container">
                <button class="book_button" data-employee-id="${employee.id}">Записатися</button>
            </div>
        </div>
    `).join('');

        renderMainContent(`
        <section class="employees_section">
            <div class="employees_container">
                ${employeeContent}
            </div>
        </section>
    `);

        document.querySelectorAll('.book_button').forEach((button) => {
            button.addEventListener('click', (event) => {
                selectedEmployee = event.target.getAttribute('data-employee-id');
                renderEmployeeSchedule(selectedEmployee, procedureId);
            });
        });
    };

    const renderEmployeeSchedule = async (employeeId, procedureId) => {
        try {
            await request({
                type: "get",
                path: "schedule",
                updateState
            });
            const schedule = initialState.schedule.data;

            console.log("Schedule data: ", schedule);

            const scheduleForEmployee = schedule.filter(item => item.employee === parseInt(employeeId));

            if (!Array.isArray(scheduleForEmployee)) {
                throw new Error("Schedule is not an array");
            }

            console.log("Filtered schedule for employee: ", scheduleForEmployee);

            const scheduleContainer = `
            <section class="schedule_section">
                <div class="schedule_container">
                    <input id="datePicker" class="flatpickr" type="text" placeholder="Виберіть дату">
                    <div id="timeSlotsContainer" class="time_slots_container"></div>
                </div>
            </section>
        `;

            renderMainContent(scheduleContainer);

            const enabledDates = scheduleForEmployee.map(({day}) => day);
            console.log("Enabled dates for flatpickr: ", enabledDates);

            flatpickr("#datePicker", {
                enable: enabledDates,
                dateFormat: "Y-m-d",
                onChange: async (selectedDates) => {
                    selectedDate = selectedDates[0].toLocaleDateString('en-CA');
                    console.log("Selected date from flatpickr: ", selectedDate);

                    const selectedSchedule = scheduleForEmployee.find(item => {
                        const scheduleDate = item.day;
                        console.log("Comparing: ", scheduleDate, "with", selectedDate); //
                        return scheduleDate === selectedDate;
                    });

                    selectedScheduleId = selectedSchedule ? selectedSchedule.id : null;

                    console.log("Selected schedule: ", selectedSchedule);

                    if (selectedScheduleId) {
                        console.log("Selected schedule ID: ", selectedScheduleId);
                        renderTimeSlots(selectedScheduleId, procedureId);
                    } else {
                        console.log("No schedule found for selected date");
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching schedule:', error);

            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            } else if (error.request) {
                console.error('Request data:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const renderTimeSlots = async (scheduleId, procedureId) => {
        try {
            if (!scheduleId) {
                throw new Error("Schedule ID is null");
            }
            console.log("Requesting time slots for schedule ID: ", scheduleId);
            const response = await axios.get(`http://localhost:8000/api/schedule/${scheduleId}/free/?procedure=${procedureId}`)
            console.log("Time slots response: ", response.data);
            const timeSlots = response.data.ranges;

            const timeSlotsContent = timeSlots.map(time => `
            <div class="time_slot">
                <button class="time_button" data-time="${time}">${time}</button>
            </div>
        `).join('');

            document.getElementById('timeSlotsContainer').innerHTML = timeSlotsContent;

            document.querySelectorAll('.time_button').forEach((button) => {
                button.addEventListener('click', (event) => {
                    const selectedTime = event.target.getAttribute('data-time');
                    bookProcedure(scheduleId, selectedProcedure, selectedDate, selectedTime);
                });
            });
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };


    const bookProcedure = async (scheduleId, procedureId, date, selectedTime) => {
        const schedule = scheduleId
        const procedure = procedureId
        const start_time = selectedTime

        const data = {
            schedule,
            procedure,
            start_time
        }
        try {
            request({
                path: "record",
                type: "post",
                data,
                updateState
            })
            alert('вам вдалося забронювати!')
            location.reload();
        } catch (error) {
            console.error('Error booking procedure:', error);
            alert('Сталася помилка при записі. Спробуйте ще раз.');
        }
    };

    const attachMakeAnAppointmentButtonHandler = () => {
        document.querySelector('#makeAnAppointmentButton').addEventListener('click', async (event) => {
            await renderProcedureTypes()
        })
    }

    const renderMainContent = async (content) => {
        const mainElement = document.getElementById('main-content');
        mainElement.innerHTML = content;
    };


    const attachReviewFormSubmitHandler = () => {
        document.querySelector("#reviewForm").addEventListener('submit', async (event) => {
            event.preventDefault()
            const comment = document.querySelector("#review").value;
            const rating = document.querySelector("#rating").value;
            const therapist = document.querySelector("#employeeSelect").value;

            if (!Number.isInteger(Number(rating)) || rating < 1 || rating > 5) {
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

    renderPage();

    return mainElement;
};
