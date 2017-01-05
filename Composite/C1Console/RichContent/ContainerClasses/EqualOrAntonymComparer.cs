using System.Collections.Generic;

namespace Composite.C1Console.RichContent.ContainerClasses
{
    internal class EqualOrAntonymComparer : IEqualityComparer<string>
    {
        public bool Equals(string x, string y)
        {
            return x.Equals(AntonymContainerClassManager.GetAntonym(y)) || x.Equals(y);
        }

        public int GetHashCode(string obj)
        {
            return obj.GetHashCode() ^ AntonymContainerClassManager.GetAntonym(obj).GetHashCode();
        }
    }
}
