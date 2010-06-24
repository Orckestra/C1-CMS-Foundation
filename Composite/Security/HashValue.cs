using System;


namespace Composite.Security
{
	public sealed class HashValue
	{
        private int _value;



        public HashValue(int value)
        {
            _value = value;
        }



        public string Serialize()
        {
            return _value.ToString();
        }



        public static HashValue Deserialize(string serializedHashValue)
        {            
            int value;

            if (int.TryParse(serializedHashValue, out value) == false)
            {
                throw new ArgumentException("The string is not a valid serialized hash value");
            }

            return new HashValue(value);
        }



        public override bool Equals(object obj)
        {
            return Equals(obj as HashValue);
        }



        public bool Equals(HashValue hashValue)
        {
            if (hashValue == null) return false;

            return _value == hashValue._value;
        }



        public override string ToString()
        {
            return _value.ToString();
        }



        public override int GetHashCode()
        {
            return _value.GetHashCode();
        }
	}
}
