using Microsoft.AspNetCore.Mvc;
using Models; 
namespace Nomes.Web.API.Controllers;

[ApiController]
[Route("[controller]")]
public class SugestoesController : ControllerBase
{
    private MyContext _c;
    public SugestoesController(MyContext c){
        _c = c;
    }
    [HttpGet(Name = "GetSugestoes")]
    public IEnumerable<Sugestao> Get()
    {
        var c = _c.Sugestoes.ToList();
        return  c;
    }

    [HttpPost(Name = "Sugestoes")]
    public void Post(string mensagem)
    {
        var m = new Sugestao{
            Mensagem = mensagem
        };

        _c.Sugestoes.Add(m);
        _c.SaveChanges();
    }
}
