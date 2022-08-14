using Microsoft.EntityFrameworkCore;
using System;

namespace Models;

public class MyContext : DbContext
{
    public MyContext(DbContextOptions options) : base(options){

    }
    
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<VisitaCategoria> VisitaCategorias{ get; set; }
    public DbSet<VisitaNome> VisitaNomes{ get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>().HasData(
            new Categoria
            {
                Id = 1,
                Titulo = "Populares",
                Color = "red",
                Emoji = "🏆",
                PrincipalNameIndex = "0",
                SearchTabIndex = "2"
            },
            new Categoria {
                Id = 2,
                Titulo = "Ascenção",
                Color = "orange",
                Emoji = "🔥",
                PrincipalNameIndex = "6",
                SearchTabIndex = "4"
            },
            new Categoria {
                Id = 3,
                Titulo = "Diferentes",
                Color = "white",
                Emoji = "⭐",
                PrincipalNameIndex = "4",
                SearchTabIndex = "3"
            },
            new Categoria {
                Id = 4,
                Titulo = "Futebol",
                Color = "green",
                Emoji = "⚽",
                PrincipalNameIndex = "1",
                SearchTabIndex = "5"
            },
            new Categoria {
                Id = 5,
                Titulo = "Famosos",
                Color = "pink",
                Emoji = "✨",
                PrincipalNameIndex = "2",
                SearchTabIndex = "6"
            },
            new Categoria {
                Id = 6,
                Titulo = "Astronomia",
                Color = "purple",
                Emoji = "🪐",
                PrincipalNameIndex = "3",
                SearchTabIndex = "7"
            },
            new Categoria {
                Id = 7,
                Titulo = "Pensadores",
                Color = "cyan",
                Emoji = "🧘‍♀️",
                PrincipalNameIndex = "4",
                SearchTabIndex = "8"
            },
            new Categoria {
                Id = 8,
                Titulo = "Geeks",
                Color = "yellow",
                Emoji = "🦸‍♂️",
                PrincipalNameIndex = "5",
                SearchTabIndex = "9"
            }
            
        );
    }
}
