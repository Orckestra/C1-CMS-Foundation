namespace Composite.C1Console.Security
{
    internal enum LoginResult
    {
        Success = 0,
        IncorrectPassword = 1,
        UserDoesNotExist = 2,
        PolicyViolated = 3
    }
}
