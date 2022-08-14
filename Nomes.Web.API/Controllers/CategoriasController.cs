using Microsoft.AspNetCore.Mvc;
using Models; 
namespace Nomes.Web.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriasController : ControllerBase
{
    private MyContext _c;
    public CategoriasController(MyContext c){
        _c = c;
    }
    [HttpGet(Name = "GetCategorias")]
    public IEnumerable<Categoria> Get()
    {
        var c = _c.Categorias.ToList();
        c.ForEach((item)=>{
            item.Count = _c.VisitaCategorias.Where((i)=> i.CategoriaId == item.Id).Count();
        });
        return  c.OrderByDescending((a)=> a.Count).ToList();
    }

    [HttpPost(Name = "Visit")]
    public void Visit(int categoriaId)
    {

        var vc = new VisitaCategoria{
            CategoriaId = categoriaId,
            Created = DateTime.Now
        };

        _c.VisitaCategorias.Add(vc);
        _c.SaveChanges();
    }
}
