namespace Composite.C1Console.Security
{
    /// <summary>
    /// Describing the user lockout reason
    /// </summary>
    internal enum UserLockoutReason
    {
        /// <summary>
        /// Undefined
        /// </summary>
        Undefined = 0,
        /// <summary>
        /// User has been locked by administrator
        /// </summary>
        LockedByAdministrator = 1,
        /// <summary>
        /// There were too many login attempts
        /// </summary>
        TooManyFailedLoginAttempts = 2,
    }
}
