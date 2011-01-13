using System;
using System.Collections.Generic;
using System.Diagnostics;
using Composite.Data.Plugins.DataProvider.CodeGeneration;
using Composite.Sql;
using Composite.Core.Types;

namespace Composite.Plugins.Data.DataProviders.MSSqlServerDataProvider.CodeGeneration
{
    [DebuggerDisplay("InterfaceType = {InterfaceType}")]
    internal sealed class SqlDataProviderCodeGeneratorTable
    {
        private List<string> _errors = new List<string>();


        public Type InterfaceType { get; set; }
        public Dictionary<string, Type> DataIdProperties { get; set; }
        public Dictionary<string, string> PropertyNameMapping { get; set; }
        public Dictionary<string, Type> PropertyInitializers { get; set; }
        internal PropertyList PropertyList { get; set; }


        public List<string> DataScopes { get; set; }
        public List<string> CultureNames { get; set; }
        internal Dictionary<string, StoreInformation> Stores { get; set; }


        public List<string> Errors { get { return _errors; } }
        internal bool Validated { get; set; }

        internal string InterfaceTypeAlias
        {
            get
            {
                return CodeGenerationHelper.GetTypeAlias(InterfaceType.FullName);
            }
        }

        internal string Fingerprint { get; set; }


        internal sealed class StoreInformation
        {
            internal string TableName { get; set; }
            internal string DataScope { get; set; }
            internal string CultureName { get; set; }
            internal string EntityClassName { get; set; }
            internal string EntityBaseClassName { get; set; }
            internal string WrapperClassName { get; set; }
            internal string DataIdClassName { get; set; }
            internal string TransformQueryableMappingsClassName { get; set; }
            internal string SqlDataProviderHelperMethodsClassName { get; set; }
            internal string DataContextFieldName { get; set; }
            internal ISqlTableInformation SqlTableInformation { get; set; }
        }
    }
}
