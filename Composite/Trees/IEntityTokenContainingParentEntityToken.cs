using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Security;


namespace Composite.Trees
{
    public interface IEntityTokenContainingParentEntityToken
    {
        EntityToken GetParentEntityToken();
    }
}
