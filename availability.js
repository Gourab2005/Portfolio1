// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Availability data (would normally come from a server/API)
    const availabilityData = {
        // Format: "YYYY-MM-DD": ["HH:MM", "HH:MM"]
        "2025-04-15": ["10:00", "14:00", "16:00"],
        "2025-04-16": ["11:00", "15:00"],
        "2025-04-17": ["09:00", "13:00", "17:00"],
        "2025-04-18": ["10:00", "14:00"],
        "2025-04-19": ["11:00", "15:00"],
        "2025-04-20": ["13:00", "16:00"], // Sunday - free sessions
        "2025-04-21": ["10:00", "14:00", "16:00"],
        "2025-04-22": ["09:00", "13:00"],
        "2025-04-23": ["11:00", "15:00"],
        "2025-04-24": ["10:00", "14:00", "16:00"],
        "2025-04-25": ["09:00", "13:00"],
        "2025-04-26": ["11:00", "15:00"],
        "2025-04-27": ["13:00", "16:00"], // Sunday - free sessions
        "2025-04-28": ["10:00", "14:00", "16:00"],
        "2025-05-01": ["09:00", "13:00", "17:00"],
        "2025-05-02": ["10:00", "14:00"],
        "2025-05-03": ["11:00", "15:00"],
        "2025-05-04": ["13:00", "16:00"], // Sunday - free sessions
        "2025-05-05": ["10:00", "14:00", "16:00"],
    };

    // Calendar elements
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlots = document.getElementById('time-slots');
    const bookingForm = document.getElementById('booking-form');
    const selectedDatetime = document.getElementById('selected-datetime');
    const sessionType = document.getElementById('session-type');

    // Current date
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTimeSlot = null;

    // Initialize calendar
    function initCalendar() {
        renderCalendar();
        
        // Event listeners for month navigation
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Render calendar
    function renderCalendar() {
        calendarDays.innerHTML = '';
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Set month and year in header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        monthYear.textContent = `${monthNames[month]} ${year}`;
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Previous month's days
        const prevMonthDays = new Date(year, month, 0).getDate();
        
        // Add empty cells for previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'empty');
            dayElement.textContent = prevMonthDays - i;
            calendarDays.appendChild(dayElement);
        }
        
        // Current month's days
        const today = new Date();
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = i;
            
            // Check if day is today
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Check if day is in the past
            const checkDate = new Date(year, month, i);
            if (checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dayElement.classList.add('disabled');
            } else {
                // Check if day has events
                const dateString = formatDate(new Date(year, month, i));
                if (availabilityData[dateString]) {
                    dayElement.classList.add('has-events');
                    
                    // Check if it's a Sunday (free sessions)
                    if (new Date(year, month, i).getDay() === 0) {
                        dayElement.classList.add('sunday');
                    }
                }
                
                // Add click event to show time slots
                dayElement.addEventListener('click', () => {
                    if (!dayElement.classList.contains('disabled')) {
                        // Remove selected class from all days
                        document.querySelectorAll('.day').forEach(day => {
                            day.classList.remove('selected');
                        });
                        
                        // Add selected class to clicked day
                        dayElement.classList.add('selected');
                        
                        // Set selected date
                        selectedDate = new Date(year, month, i);
                        
                        // Show time slots for selected date
                        showTimeSlots(selectedDate);
                    }
                });
            }
            
            calendarDays.appendChild(dayElement);
        }
        
        // Add empty cells for next month's days if needed
        const totalCells = firstDay + daysInMonth;
        const remainingCells = 7 - (totalCells % 7);
        
        if (remainingCells < 7) {
            for (let i = 1; i <= remainingCells; i++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('day', 'empty');
                dayElement.textContent = i;
                calendarDays.appendChild(dayElement);
            }
        }
    }

    // Show time slots for selected date
    function showTimeSlots(date) {
        timeSlots.innerHTML = '';
        bookingForm.classList.add('hidden');
        
        const dateString = formatDate(date);
        const slots = availabilityData[dateString];
        
        if (slots && slots.length > 0) {
            slots.forEach(slot => {
                const slotElement = document.createElement('div');
                slotElement.classList.add('time-slot');
                slotElement.textContent = slot;
                
                // Check if it's a Sunday (free session)
                if (date.getDay() === 0) {
                    slotElement.classList.add('free');
                    
                    // Update session type dropdown
                    if (sessionType) {
                        const freeOption = sessionType.querySelector('option[value="free"]');
                        if (freeOption) {
                            freeOption.disabled = false;
                        }
                    }
                } else {
                    // Disable free option for non-Sundays
                    if (sessionType) {
                        const freeOption = sessionType.querySelector('option[value="free"]');
                        if (freeOption) {
                            freeOption.disabled = true;
                        }
                    }
                }
                
                // Add click event to select time slot
                slotElement.addEventListener('click', () => {
                    // Remove selected class from all slots
                    document.querySelectorAll('.time-slot').forEach(s => {
                        s.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked slot
                    slotElement.classList.add('selected');
                    
                    // Set selected time slot
                    selectedTimeSlot = slot;
                    
                    // Show booking form
                    bookingForm.classList.remove('hidden');
                    
                    // Update selected datetime text
                    if (selectedDatetime) {
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const dateText = date.toLocaleDateString('en-US', options);
                        selectedDatetime.textContent = `${dateText} at ${slot}`;
                        
                        // If it's a Sunday, auto-select free session
                        if (date.getDay() === 0 && sessionType) {
                            sessionType.value = 'free';
                        } else if (sessionType) {
                            sessionType.value = 'tutoring'; // Default to tutoring
                        }
                    }
                });
                
                timeSlots.appendChild(slotElement);
            });
        } else {
            const noSlotsMessage = document.createElement('p');
            noSlotsMessage.classList.add('no-slots-message');
            noSlotsMessage.textContent = 'No available slots for this date';
            timeSlots.appendChild(noSlotsMessage);
        }
    }

    // Format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Initialize calendar if elements exist
    if (calendarDays && monthYear && prevMonthBtn && nextMonthBtn) {
        initCalendar();
    }
});