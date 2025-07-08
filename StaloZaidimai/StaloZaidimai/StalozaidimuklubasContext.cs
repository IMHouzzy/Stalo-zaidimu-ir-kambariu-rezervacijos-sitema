using Microsoft.EntityFrameworkCore;

namespace StaloZaidimai;

public partial class StalozaidimuklubasContext : DbContext
{
    public StalozaidimuklubasContext()
    {
    }

    public StalozaidimuklubasContext(DbContextOptions<StalozaidimuklubasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Darbuotoja> Darbuotojas { get; set; }

    public virtual DbSet<Kambary> Kambarys { get; set; }

    public virtual DbSet<Naudotoja> Naudotojas { get; set; }

    public virtual DbSet<Rezervacija> Rezervacijas { get; set; }

    public virtual DbSet<Stalozaidima> Stalozaidimas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;user=root;password=root;database=stalozaidimuklubas", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8_lithuanian_ci")
            .HasCharSet("utf8");

        modelBuilder.Entity<Darbuotoja>(entity =>
        {
            entity.HasKey(e => e.IdDarbuotojas).HasName("PRIMARY");

            entity.ToTable("darbuotojas");

            entity.Property(e => e.IdDarbuotojas)
                .HasColumnType("int(11)")
                .HasColumnName("id_Darbuotojas");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(60);
            entity.Property(e => e.PhoneNumber).HasMaxLength(25);
            entity.Property(e => e.Surname).HasMaxLength(100);

            entity.HasMany(d => d.FkRezervacijaidRezervacijas).WithMany(p => p.FkDarbuotojasidDarbuotojas)
                .UsingEntity<Dictionary<string, object>>(
                    "DarbuotojasRezervacija",
                    r => r.HasOne<Rezervacija>().WithMany()
                        .HasForeignKey("FkRezervacijaidRezervacija")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("darbuotojas_rezervacija_ibfk_2"),
                    l => l.HasOne<Darbuotoja>().WithMany()
                        .HasForeignKey("FkDarbuotojasidDarbuotojas")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("darbuotojas_rezervacija_ibfk_1"),
                    j =>
                    {
                        j.HasKey("FkDarbuotojasidDarbuotojas", "FkRezervacijaidRezervacija")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("darbuotojas_rezervacija");
                        j.HasIndex(new[] { "FkRezervacijaidRezervacija" }, "fk_Rezervacijaid_Rezervacija");
                        j.IndexerProperty<int>("FkDarbuotojasidDarbuotojas")
                            .HasColumnType("int(11)")
                            .HasColumnName("fk_Darbuotojasid_Darbuotojas");
                        j.IndexerProperty<int>("FkRezervacijaidRezervacija")
                            .HasColumnType("int(11)")
                            .HasColumnName("fk_Rezervacijaid_Rezervacija");
                    });
        });

        modelBuilder.Entity<Kambary>(entity =>
        {
            entity.HasKey(e => e.IdKambarys).HasName("PRIMARY");

            entity.ToTable("kambarys");

            entity.Property(e => e.IdKambarys)
                .HasColumnType("int(11)")
                .HasColumnName("id_Kambarys");
            entity.Property(e => e.Descrioption).HasMaxLength(255);
            entity.Property(e => e.MaxPeople).HasColumnType("int(11)");
            entity.Property(e => e.RoomNr).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Naudotoja>(entity =>
        {
            entity.HasKey(e => e.IdNaudotojas).HasName("PRIMARY");

            entity.ToTable("naudotojas");

            entity.Property(e => e.IdNaudotojas)
                .HasColumnType("int(11)")
                .HasColumnName("id_Naudotojas");
            entity.Property(e => e.Age).HasColumnType("int(11)");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(60);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.PhoneNumber).HasMaxLength(25);
            entity.Property(e => e.Role).HasMaxLength(30);
            entity.Property(e => e.Surname).HasMaxLength(100);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        modelBuilder.Entity<Rezervacija>(entity =>
        {
            entity.HasKey(e => e.IdRezervacija).HasName("PRIMARY");

            entity.ToTable("rezervacija");

            entity.HasIndex(e => e.FkKambarysidKambarys, "fk_Kambarysid_Kambarys");

            entity.HasIndex(e => e.FkNaudotojasidNaudotojas, "fk_Naudotojasid_Naudotojas");

            entity.HasIndex(e => e.FkStaloZaidimasidStaloZaidimas, "fk_StaloZaidimasid_StaloZaidimas");

            entity.Property(e => e.IdRezervacija)
                .HasColumnType("int(11)")
                .HasColumnName("id_Rezervacija");
            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.FkKambarysidKambarys)
                .HasColumnType("int(11)")
                .HasColumnName("fk_Kambarysid_Kambarys");
            entity.Property(e => e.FkNaudotojasidNaudotojas)
                .HasColumnType("int(11)")
                .HasColumnName("fk_Naudotojasid_Naudotojas");
            entity.Property(e => e.FkStaloZaidimasidStaloZaidimas)
                .HasColumnType("int(11)")
                .HasColumnName("fk_StaloZaidimasid_StaloZaidimas");
            entity.Property(e => e.PeopleAmount).HasColumnType("int(11)");
            entity.Property(e => e.RoomAmount).HasColumnType("int(11)");

            entity.HasOne(d => d.FkKambarysidKambarysNavigation).WithMany(p => p.Rezervacijas)
                .HasForeignKey(d => d.FkKambarysidKambarys)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("rezervacija_ibfk_3");

            entity.HasOne(d => d.FkNaudotojasidNaudotojasNavigation).WithMany(p => p.Rezervacijas)
                .HasForeignKey(d => d.FkNaudotojasidNaudotojas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("rezervacija_ibfk_2");

            entity.HasOne(d => d.FkStaloZaidimasidStaloZaidimasNavigation).WithMany(p => p.Rezervacijas)
                .HasForeignKey(d => d.FkStaloZaidimasidStaloZaidimas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("rezervacija_ibfk_1");
        });

        modelBuilder.Entity<Stalozaidima>(entity =>
        {
            entity.HasKey(e => e.IdStaloZaidimas).HasName("PRIMARY");

            entity.ToTable("stalozaidimas");

            entity.Property(e => e.IdStaloZaidimas)
                .HasColumnType("int(11)")
                .HasColumnName("id_StaloZaidimas");
            entity.Property(e => e.AlowedAge).HasColumnType("int(11)");
            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(60);
            entity.Property(e => e.Image).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
