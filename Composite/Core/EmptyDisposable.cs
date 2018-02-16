using System;

namespace Composite.Core
{
    internal class EmptyDisposable : IDisposable
    {
        public static readonly EmptyDisposable Instance = new EmptyDisposable();

        public void Dispose()
        {
        }
    }
}
