from datetime import datetime, timedelta

from spa_app.models import Schedule, Procedure


class SlotsValidator:
    booked_slots: list[tuple[datetime, datetime]] | None

    def __init__(self, schedule: Schedule, procedure: Procedure):
        self.schedule = schedule
        self.procedure = procedure
        self.__calculate_booked_slots()

    def __calculate_booked_slots(self) -> None:
        booked_slots = []
        for record in self.schedule.records.all():
            record_start = datetime.combine(self.schedule.day, record.start_time)
            record_end = record_start + record.procedure.duration
            record_start -= self.procedure.duration
            booked_slots.append((record_start, record_end))
        self.booked_slots = booked_slots

    @property
    def ranges(self) -> None:
        start = datetime.combine(self.schedule.day, self.schedule.start_time)
        end = datetime.combine(self.schedule.day, self.schedule.end_time)
        ranges = []
        while start <= end - self.procedure.duration:
            not_free = any(start_booked < start < end_booked for start_booked, end_booked in self.booked_slots)
            if self.__check_are_slots_are_booked(start):
                ranges.append(start.strftime('%H:%M'))
            start += timedelta(minutes=30)
        return ranges

    def __check_are_slots_are_booked(self, start: datetime) -> bool:
        return not any(start_booked < start < end_booked for start_booked, end_booked in self.booked_slots)
