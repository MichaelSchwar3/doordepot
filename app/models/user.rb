class User < ApplicationRecord

    validates :email, :password_digest, :session_token, :fname, :lname, presence: true
    validates :password, length: { minimum: 8, allow_nil: true}
    # validates :secure_password
    validates :email, uniqueness: true

    has_many :door_listings
    belongs_to :account

    attr_reader :password

    after_initialize :ensure_session_token

    ROLES = ['dd_admin', 'account_admin', 'account_user']

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        user && user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def self.generate_session_token
       token = SecureRandom.urlsafe_base64
    end

    def reset_session_token!
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end

    private

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def secure_password
        return false if (password =~ /[a-z]/).nil?
        return false if (password =~ /[A-Z]/).nil?
        return false if (password =~ /[0-9]/).nil?
        return false if (password =~ /\W/).nil?
        return true
    end
end