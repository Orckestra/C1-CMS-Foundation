namespace Composite.C1Console.Security
{
    /// <summary>
    /// Describing the result of a login validation
    /// </summary>
    public enum LoginResult
    {
        Success = 0,
        IncorrectPassword = 1,
        UserDoesNotExist = 2,
        PolicyViolated = 3
    }
}
