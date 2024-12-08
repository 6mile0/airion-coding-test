import secrets
SESSION_ID_LENGTH = 64

class SessionStore:
    sessions = {}

    @classmethod
    def generate_session_id(cls):
        while True:
            session_id = secrets.token_urlsafe(SESSION_ID_LENGTH)
            if session_id not in cls.sessions:
                return session_id
    
    @classmethod
    def create_session(cls, user_id):
        session_id = cls.generate_session_id()
        cls.sessions[session_id] = user_id
        return session_id
    
    @classmethod
    def get_user_id(cls, session_id):
        return cls.sessions.get(session_id)
    
    @classmethod
    def delete_session(cls, session_id):
        if session_id in cls.sessions:
            del cls.sessions[session_id]
        return True
    
    @classmethod
    def is_session_valid(cls, session_id):
        return session_id in cls.sessions
    
    @classmethod
    def get_all_sessions(cls):
        return cls.sessions
