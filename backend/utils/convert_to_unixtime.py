import time
from datetime import datetime

def convert_to_unixtime(date: datetime | None) -> str:
    if date is None:
        return None
    return str(int(time.mktime(date.timetuple())*1000))
