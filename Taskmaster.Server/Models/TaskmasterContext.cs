using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Taskmaster.Server.Models;

public partial class TaskmasterContext : DbContext
{
    public TaskmasterContext()
    {
    }

    public TaskmasterContext(DbContextOptions<TaskmasterContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Assignment> Assignments { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Assignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PK__Assignme__32499E5700A5F880");

            entity.Property(e => e.AssignmentId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("AssignmentID");
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(CONVERT([date],getdate()))");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Title)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.EmployeeAssignedNavigation).WithMany(p => p.Assignments)
                .HasForeignKey(d => d.EmployeeAssigned)
                .HasConstraintName("FK__Assignmen__Emplo__6FE99F9F");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF170C9EEBE");

            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Email)
                .HasMaxLength(40)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
