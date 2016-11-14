namespace Composite.Core.WebClient.PhantomJs
{
    internal enum RenderingResultStatus
    {
        Success = 0,
        Redirect = 1,
        Error = 2,
        Timeout = 3,
        PhantomServerTimeout = 4,
        PhantomServerIncorrectResponse = 5,
        PhantomServerNoOutput = 6
    }
}
