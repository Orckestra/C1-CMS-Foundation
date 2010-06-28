using System;

namespace Composite.Types
{
    internal sealed class NameTypePair
    {
        private string _name;
        private Type _type;

        public NameTypePair(string name, Type type)
        {
            _name = name;
            _type = type;
        }

        public string Name
        {
            get { return _name; }
        }

        public Type Type
        {
            get { return _type; }
        }
    }    
}
