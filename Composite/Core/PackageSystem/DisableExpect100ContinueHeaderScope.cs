using System;
using System.Net;

namespace Composite.Core.PackageSystem
{
    /// <summary>
    /// Allows avoiding 417 errors when making requests through certain proxies
    /// </summary>
    internal class DisableExpect100ContinueHeaderScope : IDisposable
    {
        private readonly bool _originalValue;

        public DisableExpect100ContinueHeaderScope()
        {
            _originalValue = ServicePointManager.Expect100Continue;
            ServicePointManager.Expect100Continue = false;
        }

        public void Dispose()
        {
            ServicePointManager.Expect100Continue = _originalValue;
        }
    }
}
