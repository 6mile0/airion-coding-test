from datetime import datetime

def convert_to_datetime(unixtime: str) -> datetime:
    return datetime.fromtimestamp(int(unixtime)/1000)
