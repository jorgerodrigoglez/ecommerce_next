import React, { useState, useEffect } from "react";
// para componentes de react para generar estilos
// npm install semantic-ui-react semantic-ui-css
import { Container, Grid, Image, Input } from "semantic-ui-react";
// next-link
import Link from "next/link";
// next-router
import { useRouter } from "next/router";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid className="top-bar">
          <Grid.Column width={8} className="top-bar__left">
            <Logo />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo.png" alt="logo" />
      </a>
    </Link>
  );
}

function Search() {
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  //console.log(search);
  const router = useRouter();
  //console.log(router);

  // evita que se ejecute la primera vez
  useEffect(() => {
    if (load) {
      router.push(`/search?query=${search}`);
    }
    setLoad(true);
  }, [search]);

  return (
    <Input
      id="search__products"
      icon={{ name: "search" }}
      value={router.query.query}
      onChange={(_, data) => setSearch(data.value)}
    />
  );
}
