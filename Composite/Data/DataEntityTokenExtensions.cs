using System;
using System.Globalization;


namespace Composite.Data
{
    public static class DataEntityTokenExtensions
    {
        public static DataEntityToken GetDataEntityToken(this IData data)
        {
            if (data == null) throw new ArgumentNullException("data");

            return new DataEntityToken(data);
        }
    }
}
