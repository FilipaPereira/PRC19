<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text"/>
    
    <xsl:template match="obra">
        ###  http://prc.di.uminho.pt/2020/arquivo-musical#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        :compositor "<xsl:value-of select="compositor"/>"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo"/>"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo"/>"^^xsd:string .
        <xsl:apply-templates select="instrumentos"/>
    </xsl:template>
    
    <xsl:template match="instrumento">
        ###  http://prc.di.uminho.pt/2020/arquivo-musical#<xsl:value-of select="translate(designacao, ' ','')"/>_<xsl:value-of select="../../@id"/>
        :<xsl:value-of select="translate(designacao, ' ','')"/>_<xsl:value-of select="../../@id"/> rdf:type owl:NamedIndividual ,
        :Instrumento ;
        :eUtilizado :<xsl:value-of select="../../@id"/> ;
        :designacao "<xsl:value-of select="translate(designacao, ' ','')"/>"^^xsd:string .
        <xsl:apply-templates select="partitura"/>
    </xsl:template>
    
    <xsl:template match="partitura">
        ###  http://prc.di.uminho.pt/2020/arquivo-musical#partitura_<xsl:value-of select="@path"/>
        :partitura_<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
        :Partitura ;
        :define :<xsl:value-of select="translate(../designacao, ' ','')"/>_<xsl:value-of select="../../../@id"/> ;
        <xsl:choose>
            <xsl:when test="@voz">
        :voz "<xsl:value-of select="@voz"/>"^^xsd:string ;
            </xsl:when>
        </xsl:choose>
        :path "<xsl:value-of select="@path"/>"^^xsd:string ;
        :tipo "<xsl:value-of select="@type"/>"^^xsd:string .
    </xsl:template>

</xsl:stylesheet>