import time
from datetime import datetime

def convert_to_unixtime(date: datetime) -> str:
    return str(int(time.mktime(date.timetuple())*1000))
