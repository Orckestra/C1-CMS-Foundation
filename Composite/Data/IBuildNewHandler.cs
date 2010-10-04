using System;


namespace Composite.Data
{
    public interface IBuildNewHandler
    {
        Type GetTypeToBuild(Type dataType);
    }
}
