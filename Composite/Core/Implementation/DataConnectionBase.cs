using System;
using System.Globalization;
using Composite.Data;


namespace Composite.Core.Implementation
{
    public class DataConnectionBase
    {
        protected void InitializeScope()
        {
            this.PublicationScope = Data.PublicationScope.Unpublished;
            this.DataScopeIdentifier = DataScopeIdentifier.Administrated;
            this.Locale = null;
        }


        protected void InitializeScope(PublicationScope scope, CultureInfo locale)
        {
            this.PublicationScope = scope;
            SetDataScopeIdentifier(scope);
            this.Locale = locale;
        }


        protected PublicationScope PublicationScope { get; private set; }

        protected DataScopeIdentifier DataScopeIdentifier { get; private set; }

        protected CultureInfo Locale { get; private set; }


        private void SetDataScopeIdentifier(PublicationScope scope)
        {
            switch (scope)
            {
                case PublicationScope.Published:
                    this.DataScopeIdentifier = DataScopeIdentifier.Public;
                    break;

                case PublicationScope.Unpublished:
                    this.DataScopeIdentifier = DataScopeIdentifier.Administrated;
                    break;

                default:
                    throw new ArgumentException(string.Format("PublicationScope {0} not supported", scope), "scope");
            }
        }
    }
}
