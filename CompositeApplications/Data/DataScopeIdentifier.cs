using System;
using System.Diagnostics;


namespace Composite.Data
{
    [DebuggerDisplay("Name = {Name}")]
    public sealed class DataScopeIdentifier
    {
        public const string PublicName = "public";
        public const string AdministratedName = "administrated";

        [Obsolete("To be removed")]
        public const string VersionedName = "versioned";

        public static DataScopeIdentifier Public { get { return new DataScopeIdentifier(PublicName); } }
        public static DataScopeIdentifier Administrated { get { return new DataScopeIdentifier(AdministratedName); } }

        [Obsolete("To be removed")]
        public static DataScopeIdentifier Versioned { get { return new DataScopeIdentifier(VersionedName); } }


        public static DataScopeIdentifier GetDefault()
        {
            return DataScopeIdentifier.Public;
        }

        private DataScopeIdentifier(string dataScope)
        {
            this.Name = dataScope;
        }


        public string Name
        {
            get;
            private set;
        }


        public string Serialize()
        {
            return this.Name;
        }



        public static DataScopeIdentifier Deserialize(string serializedData)
        {
            if (serializedData == null) throw new ArgumentNullException("serializedData");

            switch (serializedData)
            {
                case "public":
                    return DataScopeIdentifier.Public;

                case "administrated":
                    return DataScopeIdentifier.Administrated;

                default:
                    throw new InvalidOperationException("The serializedData argument was not a serialized DataScope");
            }
        }


        public static bool IsLegasyDataScope(string name)
        {
            name = name.ToLower();
            return name == "deleted" || name == "versioned";
        }


        public override bool Equals(object obj)
        {
            if (obj == null) return false;

            return Equals(obj as DataScopeIdentifier);
        }



        public bool Equals(DataScopeIdentifier dataScope)
        {
            if (dataScope == null) return false;

            return this.Name == dataScope.Name;
        }



        public override int GetHashCode()
        {
            return this.Name.GetHashCode();
        }



        public override string ToString()
        {
            return this.Serialize();
        }       
    }
}
