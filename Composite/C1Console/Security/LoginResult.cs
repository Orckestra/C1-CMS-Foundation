namespace Composite.C1Console.Security
{
    /// <summary>
    /// Describing the result of a login validation
    /// </summary>
    public enum LoginResult
    {
        /// <summary>
        /// Success
        /// </summary>
        Success = 0,

        /// <summary>
        /// Incorrect password
        /// </summary>
        IncorrectPassword = 1,

        /// <summary>
        /// User does not exist
        /// </summary>
        UserDoesNotExist = 2,

        /// <summary>
        /// Login policy violated
        /// </summary>
        PolicyViolated = 3,

        /// <summary>
        /// User is locked after maximum login attempts
        /// </summary>
        UserLockedAfterMaxLoginAttempts = 4,

        /// <summary>
        /// User is locked by administrator
        /// </summary>
        UserLockedByAdministrator = 5,

        /// <summary>
        /// User's password has to be updated.
        /// </summary>
        PasswordUpdateRequired = 6
    }
}
