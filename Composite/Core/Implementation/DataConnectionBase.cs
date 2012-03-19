using System;
using System.Globalization;
using Composite.Core.Extensions;
using Composite.Data;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Documentation pending
    /// </summary>
    public class DataConnectionBase
    {
        /// <summary>
        /// Documentation pending
        /// </summary>
        protected void InitializeScope()
        {
            this.PublicationScope = Data.PublicationScope.Unpublished;
            this.DataScopeIdentifier = DataScopeIdentifier.Administrated;
            this.Locale = null;
        }


        /// <summary>
        /// Documentation pending
        /// </summary>
        /// <param name="scope"></param>
        /// <param name="locale"></param>
        protected void InitializeScope(PublicationScope scope, CultureInfo locale)
        {
            this.PublicationScope = scope;
            SetDataScopeIdentifier(scope);
            this.Locale = locale;
        }


        /// <summary>
        /// Documentation pending
        /// </summary>
        protected PublicationScope PublicationScope { get; private set; }

        /// <summary>
        /// Documentation pending
        /// </summary>
        protected DataScopeIdentifier DataScopeIdentifier { get; private set; }

        /// <summary>
        /// Documentation pending
        /// </summary>
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
                    throw new ArgumentException("PublicationScope {0} not supported".FormatWith(scope), "scope");
            }
        }
    }
}
